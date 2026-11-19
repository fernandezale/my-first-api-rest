import { Router } from "express";
import { getCategories, createCategory, UpdateCategory, deleteCategory } from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { check } from "express-validator";
import { handleValidationErrors } from "../middlewares/validators.js";

const router = Router();

router.get("/",getCategories)
router.post("/", [authenticate, 
    check("nombre").notEmpty().withMessage("El nombre de la categoría es requerido"),
    handleValidationErrors,
], createCategory)
router.put("/:id",[authenticate,
    check("id").isMongoId().withMessage("El ID de la categoría es inválido"),
    check("nombre").notEmpty().withMessage("El nombre de la categoría es requerido"),
    handleValidationErrors,
], UpdateCategory)
router.delete("/:id",[authenticate,
    check("id").isMongoId().withMessage("El ID de la categoría es inválido"),
    handleValidationErrors,
], deleteCategory)

export default router;