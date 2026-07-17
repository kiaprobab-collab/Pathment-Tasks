import { z } from "zod"

export const registerSchema = z.object({
    email: z.string().email("Invalid Email Address").toLowerCase().trim(),
    password: z.string().trim().min(8, "The password should be atleast of 8 Characters"),
    username: z.string().min(2, "Username should be greater than 2 Character")
})

export const loginSchema = z.object({
    email: z.string().email("Invalid Email Address").toLowerCase().trim(),
    password: z.string().min(1, { message: "Password is required" }),
})

