import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { loginSchema, registerSchema } from "./auth.schema.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv"

dotenv.config()

const isProduction = process.env.NODE_ENV === "production"

// Sign jwt token with user id as payload, provide secret key and set expire date
function generateToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

// Register user
export const registerhandler = async(req, res, next) => {
    try {
        // Validate user input
        const { username, email, password } = registerSchema.parse(req.body);
        // console.log(result)
        // if(!result.success){
        //     return res.status(400).json({
        //         message: result.error 
        //     })
        // }
        // Check if user already exist
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(409).json({
                message: "User with this email id already exist, Try another email"
            })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            
        })

        const token = generateToken(user._id);

        // Set JWT cookie to httpOnly true, so that it cannot be accessed by client side javascript
        res.cookie("token", token ,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        })

        return res.status(201).json({
            user:{
                username,
                email,
            },
            message: "User Registered Successfully"
        })

    } catch (err) {
        next(err);
    }
}

// Login user
export const loginHandler = async(req, res, next) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        // Find user
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        })


        return res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
            },
            message: "log-in Successfully"
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const googleAuthHandler = async(req, res, next) => {
    try {
        const { email, name, photo } = req.body;

        // Check if user already exists with this email
        const existingUser = await User.findOne({ email });

        if(existingUser){
            // User exists — log them in
            const token = generateToken(existingUser._id);

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
            })

            return res.status(200).json({
                user: {
                    _id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    avatar: existingUser.avatar,
                },
                message: "User Logged in Successfully"
            })
        }

        // User doesn't exist — create a new account
        // Generate a random password (Google users won't use it, but the field is required)
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(generatedPassword, salt);

        const newUser = await User.create({
            username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
            email,
            password: hashedPassword,
            avatar: photo,
        })

        const token = generateToken(newUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        })

        return res.status(201).json({
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
            },
            message: "User Registered Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const logoutHandler = async(req, res, next) => {
    try {
        // Clear cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        })
        
        return res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (err) {
        next(err)
    }
}