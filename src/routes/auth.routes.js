import Router from 'express';
import { getUsers, login, register, verifyEmail, logout, getProfile, updatePassword, resentVerificationCode } from "../controllers/auth.controllers.js"
import { authenticate } from "../middlewares/auth.js";
import { validateRegister, validateLogin, validateEmailCode, validateEmail, validateUpdatePassword } from "../middlewares/validators.js";

const router = Router();


router.post("/register", validateRegister(),register);
router.post("/login", validateLogin(), login);
router.post("/verify-email", validateEmailCode(), verifyEmail);

//rutas protegidas
router.get("/", authenticate, getUsers);
router.get("/logout", authenticate, logout);
router.get("/profile", authenticate, getProfile);

//actualizar contraseña
router.put("/password", validateUpdatePassword(), updatePassword);

//reenviar codigo de verificacion
router.post("/resend", validateEmail(), resentVerificationCode);

export default router;