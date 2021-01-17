import asyncHandler from "express-async-handler";
import Order from "../orders/orderModel.js";

const createOrder = asyncHandler(async (req, res) => {
  try {

    const order = await Order.create({
        title: req.body.title,
        user_id: req.body.user,
        product_id: req.body.product_id,
        customer: req.body.customer,
        amount: req.body.amount,
        currency: req.body.currency,
        transaction_id: req.body.transaction_id,
        tx_ref: req.body.tx_ref,
        deliveredAt: req.body.flw_ref
    });

    res.status(201).json({
      status: "OK",
      data: { order },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


const getOrders = asyncHandler(async (req, res) => {})

export { createOrder, getOrders };
