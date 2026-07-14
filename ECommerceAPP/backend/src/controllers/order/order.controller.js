import { Order } from "../../models/order.model.js";
import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "./order.schema.js";

// Place order (converts cart into an order)
export const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = createOrderSchema.parse(req.body);

    // Get user cart
    const cart = await Cart.findOne({ 
      user: req.userId 
    }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
         message: "Cart is empty" 
      });
    }

    // Build order items with price and validate stock
    let totalAmount = 0;
    const orderItems = [];

    for (const cartItem of cart.items) {
      const product = cartItem.product;

      if (!product) {
        return res
          .status(400)
          .json({ message: "A product in your cart no longer exists" });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for "${product.name}",Only ${product.stock} available.`,
        });
      }

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: product.price,
      });

      totalAmount += product.price * cartItem.quantity;
    }

    // Deduct stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Create order
    const order = await Order.create({
      user: req.userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
    });

    // Clearing cart after placing order
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      order,
      message: "Order placed successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get all orders for the logged-in user
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate("items.product", "name image");

    return res.status(200).json({
      orders,
      message:"Order fetched successfully"
    });
  } catch (err) {
    next(err);
  }
};

// Get single order by ID , So user can see a particular order in detail
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "name image price"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure user can only see their own orders
    if (order.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({
           message: "Not authorized to view this order" 
        });
    }

    return res.status(200).json({
      order,
      message:"Order fetched successfully"
    });
  } catch (err) {
    next(err);
  }
};


export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = updateOrderStatusSchema.parse(req.body);

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // If cancelling, restore the stock
    if (status === "cancelled" && order.status !== "cancelled") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      order,
      message: `Order status updated to "${status}"`,
    });
  } catch (err) {
    next(err);
  }
};


