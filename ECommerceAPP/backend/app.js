import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { authRoute } from "./src/routes/auth.routes.js";
import { productRoute } from "./src/routes/product.routes.js";
import { cartRoute } from "./src/routes/cart.routes.js";
import { orderRoute } from "./src/routes/order.routes.js";

dotenv.config();

export const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// API Routes
app.use("/api/auth", authRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", orderRoute);

// Remember! - This should be in last
app.use(errorHandler);