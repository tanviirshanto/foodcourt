import mongoose, { Document, Schema, Model, models } from "mongoose";
import { OrderItem, SingleOrder } from "@/types/order";

export interface OrderDocument extends Document {
  user_id: mongoose.Types.ObjectId;
  orders: SingleOrder[];
}

const orderItemSchema = new Schema<OrderItem>({
  id: String,
  name: String,
  category: String,
  estimated_time: Number,
  image: String,
  quantity: Number,
  price: Number,
});

const singleOrderSchema = new Schema<SingleOrder>({
  tran_id: { type: String, unique: true },
  val_id:{ type: String, unique: true },
  order_date: { type: Date, default: Date.now },
  name: String,
  address: { type: String, required: true },
  email: String,
  contact: { type: String, required: true },
  items: [orderItemSchema],
  shipping: {
    type: String,
    enum: ["pending", "delivered", "cancelled"],
  },
  shipping_charge: Number,
  payment: {
    type: String,
    enum: ["pending", "paid", "cash on delivery"],
  },
  full_total: { type: Number, required: true },
  total_time: Number,
});

const orderSchema = new Schema<OrderDocument>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orders: [singleOrderSchema],
  },
  { timestamps: true }
);

const Order: Model<OrderDocument> = models.orders || mongoose.model<OrderDocument>("orders", orderSchema);
export default Order;
