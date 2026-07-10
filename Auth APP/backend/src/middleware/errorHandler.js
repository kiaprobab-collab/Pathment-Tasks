import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;

    // Handling Zod validation errors
    if (err instanceof ZodError) {
        statusCode = 400;

        if (process.env.NODE_ENV === "development") {
            return res.status(statusCode).json({
                message: "Validation Failed",
                errors: err.issues,
                stack: err.stack,
            });
        }

        return res.status(statusCode).json({
            message: "Validation Failed",
            errors: err.issues,
        });
    }

    // Handling all other errors
    if (process.env.NODE_ENV === "development") {
        return res.status(statusCode).json({
            message: err.message,
            stack: err.stack,
        });
    }

    return res.status(statusCode).json({
        message:
            statusCode === 500
                ? "Internal Server Error"
                : err.message,
    });
};