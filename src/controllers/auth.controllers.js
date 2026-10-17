import User from "../models/User.js"

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
        const user = new User({ username, email, password });

        //generar codigo de verificacion

        //guardar el usuario
        await user.save();

        //enviar el email de verificacion

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