import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  product_id: { type: String },
  customer: {
    name: { type: String },
    email: { type: String },
    phone_number: { type: Number },
  },
  amount: { type: String },
  currency: {
    type: String,
  },
  transaction_id: {
    type: String,
  },
  tx_ref: {
    type: String,
  },
  flw_ref: { type: String },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
