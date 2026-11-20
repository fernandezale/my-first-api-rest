import { Router } from "express";
import { getCategories, createCategory, UpdateCategory, deleteCategory } from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { check } from "express-validator";
import { handleValidationErrors, validateRoleAdmin, validateCategoryId } from "../middlewares/validators.js";

const router = Router();

router.get("/",getCategories)
router.post("/", [authenticate,
    validateRoleAdmin,
    check("nombre").notEmpty().withMessage("El nombre de la categoría es requerido"),
    handleValidationErrors,
], createCategory)
router.put("/:id",[authenticate,
    validateRoleAdmin,
    check("id").isMongoId().withMessage("El ID de la categoría es inválido"),
    check("nombre").notEmpty().withMessage("El nombre de la categoría es requerido"),
    check("id").custom(validateCategoryId),
    handleValidationErrors,
], UpdateCategory)
router.delete("/:id",[authenticate,
    validateRoleAdmin,
    check("id").isMongoId().withMessage("El ID de la categoría es inválido"),
    check("id").custom(validateCategoryId),
    handleValidationErrors,
], deleteCategory)

export default router;