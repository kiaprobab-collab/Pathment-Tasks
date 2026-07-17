import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authMiddleware(req , res, next) {
  try {
    // Try cookie first
    let token = req.cookies?.token;

    // Fallback to Authorization header  
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please login.",
      });
    }

    // Attach user id to request for further us in controller
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; 
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again.",
    });
  }
}