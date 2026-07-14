import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order/order.controller.js";

export const orderRoute = express.Router();

// All order routes are protected
orderRoute.post("/orders", authMiddleware, createOrder);
orderRoute.get("/orders", authMiddleware, getMyOrders);
orderRoute.get("/orders/:id", authMiddleware, getOrderById);
orderRoute.patch("/orders/:id/status", authMiddleware, updateOrderStatus);
