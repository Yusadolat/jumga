import asyncHandler from "express-async-handler";
import Order from "../orders/orderModel.js";

const createOrder = asyncHandler(async (req, res) => {
  try {

    const order = await Order.create({
        user: req.body.user,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentResult: req.body.paymentResult,
        paidAt: req.body.paidAt,
        isDelivered: req.body.isDelivered,
        deliveredAt: req.body.deliveredAt
    });

    res.status(201).json({
      status: "OK",
      data: { order },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export { createOrder };