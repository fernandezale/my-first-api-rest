import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
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

//put

//delete