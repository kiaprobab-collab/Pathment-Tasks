import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler.js";
import { authRoute } from "./routes/auth.routes.js";

dotenv.config();

export const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())



app.use(authRoute);

// Remember! - This should be in last
app.use(errorHandler);
