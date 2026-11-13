import Router from 'express';
import { getUsers, login, register, verifyEmail } from "../controllers/auth.controllers.js"
import { authenticate } from "../middlewares/auth.js";
import { validateRegister } from "../middlewares/validators.js";

const router = Router();


router.get("/", authenticate, getUsers);
router.post("/register", validateRegister(),
register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

export default router;