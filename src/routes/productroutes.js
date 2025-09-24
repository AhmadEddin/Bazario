import express from "express";
import { createProduct, getProducts, getProductById } from "../controllers/productcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
