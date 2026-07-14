import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cart/cart.controller.js";

export const cartRoute = express.Router();

// All cart routes are protected using auth middleware
cartRoute.get("/cart", authMiddleware, getCart);
cartRoute.post("/cart", authMiddleware, addToCart);
cartRoute.put("/cart/:productId", authMiddleware, updateCartItem);
cartRoute.delete("/cart/:productId", authMiddleware, removeFromCart);

