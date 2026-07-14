import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters").trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(2, "Category must be at least 2 characters").trim(),
  stock: z.number().int().min(0, "Stock cannot be negative").default(0),
  image: z.string().url("Image must be a valid URL").optional(),
});

export const updateProductSchema = createProductSchema.partial();
