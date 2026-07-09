import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    passwordHashed: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const User = mongoose.Model("userSchema", userSchema);