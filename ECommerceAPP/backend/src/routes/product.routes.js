import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product/product.controller.js";

export const productRoute = express.Router();

// Public routes
productRoute.get("/products", getAllProducts);
productRoute.get("/products/:id", getProductById);

// Protected routes 
productRoute.post("/products", authMiddleware, createProduct);
productRoute.put("/products/:id", authMiddleware, updateProduct);
productRoute.delete("/products/:id", authMiddleware, deleteProduct);
