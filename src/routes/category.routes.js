import { Router } from "express";
import { getCategories, createCategory, UpdateCategory } from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.get("/",getCategories)
router.post("/", authenticate, createCategory)
router.put("/:id",authenticate, UpdateCategory)
router.delete("/",()=>{})

export default router;