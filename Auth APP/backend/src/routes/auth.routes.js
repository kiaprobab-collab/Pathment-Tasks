import express from "express"
import { loginHandler, registerhandler, logoutHandler } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const authRoute = express.Router();

authRoute.post("/register", registerhandler);
authRoute.post("/login", loginHandler);
authRoute.get("/logout", authMiddleware , logoutHandler);