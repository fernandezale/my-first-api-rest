import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("Token recibido en cookies:", token); // <-- Ver si llega la cookie

        if(!token){
            return res.status(401).json({
                ok: false,
                msg: 'No se proporciono un token de autenticacion'
            });
        }

        const decoded = verifyToken(token);
        console.log("ID decodificado del token:", decoded); // <-- Ver qué ID trae por dentro

        const user = await User.findById(decoded.id).select('-password');
        console.log("Usuario encontrado en DB:", user); // <-- Ver si Mongoose lo encuentra

        if(!user){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en la autenticacion',
            error: error.message
        });
    }
};