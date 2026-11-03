import User from "../models/User.js";
import { vertifyToken } from "../utils/jwt.js";

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: 'No se proporciono un token de autenticacion'
            });
        }
        const decoded = verifyToken(token);
        //buscar usuario asociado al token
        const user = await User.findById(decoded.userId).select('-password');
    }
    catch (error) {}
};