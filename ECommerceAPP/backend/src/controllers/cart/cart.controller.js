import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";
import { addToCartSchema, updateCartItemSchema } from "./cart.schema.js";

// Get user's cart
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.userId }).populate(
      "items.product",
      "name price image stock"
    );

    // if cart empty create cart
    if (!cart) {
      cart = await Cart.create({
        user: req.userId,
        items: [] 
    });
    }

    return res.status(200).json({
      cart 
    });
  } catch (err) {
    next(err);
  }
};

// Add item to cart
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = addToCartSchema.parse(req.body);

    // Checking product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found" 
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Only ${product.stock} available.`,
      });
    }

    let cart = await Cart.findOne({ 
        user: req.userId 
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product already in cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({  
          product: productId, 
          quantity 
        });
      }

      await cart.save();
    }

    // Populate before returning
    cart = await Cart.findById(cart._id).populate(
      "items.product",
      "name price image stock"
    );

    return res.status(200).json({
      cart,
      message: "Item added to cart",
    });
  } catch (err) {
    next(err);
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = updateCartItemSchema.parse(req.body);
    const { productId } = req.params;

    const cart = await Cart.findOne({ 
        user: req.userId 
    });

    if (!cart) {
      return res.status(404).json({
         message: "Cart not found" 
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ 
        message: "Item not found in cart"
      });
    }

    // Verify stock availability
    const product = await Product.findById(productId);
    if (product.stock < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Only ${product.stock} available.`,
      });
    }

    item.quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "items.product",
      "name price image stock"
    );

    return res.status(200).json({
      cart: updatedCart,
      message: "Cart updated",
    });
  } catch (err) {
    next(err);
  }
};

// Remove item from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "items.product",
      "name price image stock"
    );

    return res.status(200).json({
      cart: updatedCart,
      message: "Item removed from cart",
    });
  } catch (err) {
    next(err);
  }
};


