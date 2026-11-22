import { Router } from "express";
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { check } from "express-validator";
import { handleValidationErrors, validateRoleAdmin, validateProductId, validateCategoryId } from "../middlewares/validators.js";

const router = Router();

//get
router.get("/", getProducts);

//get by id
router.get("/:id", [
    check("id").isMongoId().withMessage("El ID del producto es inválido"),
    check("id").custom(validateProductId),
    handleValidationErrors,
], getProductById);

//post
router.post("/", 
    [
        authenticate,
        validateRoleAdmin,
        check("nombre", "El nombre es obligatorio").notEmpty(),
        check("categoria")
        .notEmpty()
        .withMessage("La categoría es obligatoria")
        .isMongoId()
        .withMessage("No es un id de mongo válido"),
        handleValidationErrors,
    ],
 createProduct);

//put
router.put("/:id", 
    [
        authenticate,
        validateRoleAdmin,
        check("id").isMongoId().withMessage("El ID del producto es inválido"),
        check("id").custom(validateProductId),
        handleValidationErrors,
    ],
     updateProduct)
     ;

//delete
router.delete("/:id",
    [
        authenticate,
        validateRoleAdmin,
        check("id").isMongoId().withMessage("El ID del producto es inválido"),
        check("id").custom(validateProductId),
        handleValidationErrors,
    ],
    deleteProduct
);

export default router;