import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const userRoute = express.Router();

userRoute.put("/update/:id", authMiddleware, updateUser);
userRoute.delete("/delete/:id", authMiddleware, deleteUser);
