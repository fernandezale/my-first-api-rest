import Router from 'express';
import { getUsers, login, register, verifyEmail, logout, getProfile } from "../controllers/auth.controllers.js"
import { authenticate } from "../middlewares/auth.js";
import { validateRegister, validateLogin, validateEmailCode } from "../middlewares/validators.js";

const router = Router();


router.post("/register", validateRegister(),
register);
router.post("/login", validateLogin(), login);
router.post("/verify-email", validateEmailCode(), verifyEmail);

//rutas protegidas
router.get("/", authenticate, getUsers);
router.get("/logout", authenticate, logout);
router.get("/profile", authenticate, getProfile);

export default router;