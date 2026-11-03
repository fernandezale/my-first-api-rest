import User from "../models/User.js"
import { sendVerificationEmail } from "../config/nodemailer.js";
import { generateToken } from "../utils/jwt.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            ok: true,
            msg: 'Todo bien',
            users,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuarios',
            error: error.message,
        });
    }
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //crear usuario
        const user = new User({ username, email, password });

        //generar codigo de verificacion
        const verificationCode = user.generateVerificationCode();
        console.log(`Codigo de verificacion para ${email}: ${verificationCode}`);
        //guardar el usuario
        await user.save();

        //enviar el email de verificacion
        await sendVerificationEmail(email, username, verificationCode);

        //mandar la respuesta
        return res.status(200).json({
            ok: true,
            msg: 'Usuario creado exitosamente!'
            
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error creando usuario',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password}= req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }
        //chequear que el password coincida
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(403).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }
        //chequear si el email esta verificado
        if(!user.emailVerified){
            return res.status(403).json({
                ok: false,
                msg: 'El email no esta verificado'
            });
        }
        //generar el token de verificacion
        const token = generateToken(user._id);
        //Y guardar el token en las cookies del navegador
        //httpOnly

        const token = generateToken(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60*60*1000 // 1 hora
        };

        res.cookie("token", token, cookieOptions);

        //iniciar sesion
        return res.status(200).json({
            ok: true,
            msg: 'Inicio de sesion exitoso!!!',
            token: token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesion',
            error: error.message
        });

    }

};

//verificar el codigo de verificacion
export const verifyEmail = async (req, res) => {
    try {
        const {code, email} =req.body
    //buscamos el usuario por email
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }
    if(user.verificationCode !== code){
        return res.status(400).json({
            ok: false,
            msg: 'Codigo de verificacion incorrecto'
        });
    }
    if(user.verificationCodeExpires < Date.now()){
        return res.status(400).json({
            ok: false,
            msg: 'Codigo de verificacion expirado'
        });
    }

    //marcar el email como verificado
    user.emailVerified = true;
    //limpiar el codigo de verificacion y la fecha de expiracion
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    //guardar el usuario
    await user.save();

    return res.status(200).json({
        ok: true,
        msg: 'Email verificado exitosamente'
    });
    }catch (error) {
        console.error('Error al verificar email:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al verificar email',
            error: error.message
        });
    }
};
