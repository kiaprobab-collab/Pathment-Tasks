import express from "express"
import { loginHandler, registerhandler, logoutHandler } from "../controllers/auth.controller.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const authRoute = express.Router();

authRoute.post("/register", registerhandler);
authRoute.post("/login", loginHandler);
authRoute.get("/logout", logoutHandler);