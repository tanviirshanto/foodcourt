import { Types } from "mongoose";

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  estimated_time: number;
  image: string;
  quantity: number;
  price: number;
}

export interface SingleOrder {
  tran_id:String,
  order_date?: Date;
  name?: string;
  address: string;
  email?: string;
  contact: string;
  items: OrderItem[];
  shipping: "pending" | "delivered" | "cancelled";
  shipping_charge?: number;
  payment: "pending" | "paid" | "cash on delivery";
  full_total: number;
  total_time?: number;
}

export interface OrderDocument {
  user_id: Types.ObjectId;
  orders: SingleOrder[];
}

