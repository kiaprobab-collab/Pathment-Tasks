import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler.js";
import { authRoute } from "./routes/auth.routes.js";
import { userRoute } from "./routes/user.routes.js";

dotenv.config();

export const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);


app.use(errorHandler);
