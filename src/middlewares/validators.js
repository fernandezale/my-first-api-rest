import { validationResult, check } from "express-validator";
import User from "../models/User.js";

export const handleValidationErrors = (req, res, next) => {
    //preguntar si no hay errores
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
};

//funcion para validar registro
export const validateRegister = (req, res, next) => [
    check("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .custom(async (value) => {
        const user = await User.findOne({ username: value });
        if (user) {
            throw new Error("El nombre de usuario ya existe");
        }
    }),
    handleValidationErrors
];