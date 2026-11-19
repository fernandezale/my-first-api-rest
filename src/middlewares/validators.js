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

    //validar email
    check("email")
    .isEmail().withMessage("El email no es válido")
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error("El email ya está registrado");
        }
    })
    .toLowerCase(),

    //validar password
    check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,15}$/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial")
    ,
    handleValidationErrors
];

//funcion para validar login
export const validateLogin = (req, res, next) => [
    check("email")
    .isEmail().withMessage("Ingrese un email válido")
    .trim()
    .toLowerCase()
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (!user) {
            throw new Error("El email no está registrado");
        }
    }),

    //validar password
    check("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña es incorrecta")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,15}$/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial")
    ,
    handleValidationErrors,
];

//validacion de codigo de email
export const validateEmailCode = (req, res, next) => [
    check("code")
    .notEmpty().withMessage("El código de verificación es obligatorio")
    .isLength({ min: 6, max: 6 }).withMessage("El código de verificación debe tener 6 dígitos")
    .trim()
    .isNumeric().withMessage("El código de verificación debe ser numérico"),
    check("email")
    .isEmail().withMessage("Ingrese un email válido")
    .toLowerCase()
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (!user) {
                throw new Error("Usuario no encontrado");
            }
        if (user.emailVerified) {
            throw new Error("El email ya esta verificado");
        }
    }),
    handleValidationErrors
];

export const validateUpdatePassword = (req, res, next) => [
    check("email")
    .isEmail().withMessage("Ingrese un email válido")
    .trim()
    .toLowerCase()
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (!user) {
            throw new Error("El email no está registrado");
        }
    }),
    check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,15}$/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"),

    handleValidationErrors

]

export const validateEmail = (req, res, next) => [
    check("email")
    .trim()
    .isEmail().withMessage("Ingrese un email válido")
    .toLowerCase()
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (!user) {
            throw new Error("El email no está registrado");
        }
    }),
    handleValidationErrors
]

export const validateRoleAdmin = (req, res, next) => {
    const rol = req.user.rol;
    if(rol !== "admin"){
        
    }
}