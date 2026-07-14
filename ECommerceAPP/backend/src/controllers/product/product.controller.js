import { Product } from "../../models/product.model.js";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.schema.js";

// Create a new product
export const createProduct = async (req, res, next) => {
  try {
    const data = createProductSchema.parse(req.body);

    const product = await Product.create({
      ...data,
      createdBy: req.userId,
    });

    return res.status(201).json({
      product,
      message: "Product created successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "username email");

    return res.status(200).json({
      products,
      message: "Products fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get single product by ID (public)
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "username email"
    );

    if (!product) {
      return res.status(404).json({
         message: "Product not found" 
      });
    }

    return res.status(200).json({
      product,
      message: "Product fetched successfully"
    });
  } catch (err) {
    next(err);
  }
};

// Update product (only the creator can update)
export const updateProduct = async (req, res, next) => {
  try {
    const data = updateProductSchema.parse(req.body);

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
         message: "Product not found" 
      });
    }

    if (product.createdBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({
          message: "Not authorized to update this product" 
        });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    return res.status(200).json({
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Delete product (only the creator candelete)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
         message: "Product not found" 
      });
    }

    if (product.createdBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({
           message: "Not authorized to delete this product" 
        });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
       message: "Product deleted successfully" 
      });
  } catch (err) {
    next(err);
  }
};
