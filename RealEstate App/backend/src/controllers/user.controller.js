import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

// Update user
export const updateUser = async (req, res, next) => {
    // Only allow user to update their own account
    if (req.userId !== req.params.id) {
        return res.status(403).json({
            message: "You can only update your own account",
        });
    }

    try {
        const updateFields = {};

        if (req.body.username) updateFields.username = req.body.username;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.avatar) updateFields.avatar = req.body.avatar;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        // Don't send password in response
        const { password, ...rest } = updatedUser._doc;

        return res.status(200).json({
            user: rest,
            message: "User updated successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Delete user
export const deleteUser = async (req, res, next) => {
    if (req.userId !== req.params.id) {
        return res.status(403).json({
            message: "You can only delete your own account",
        });
    }

    try {
        await User.findByIdAndDelete(req.params.id);

        res.clearCookie("token");

        return res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
