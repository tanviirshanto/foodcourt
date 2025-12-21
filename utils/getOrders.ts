import Order from "@/models/orderModel";

import { SingleOrder } from "@/types/order";
import { serializeOrders } from "./serialize";

export async function getOrders(userId: string): Promise<SingleOrder[]> {
  const data = await Order.findOne({ user_id: userId }).lean();
  return serializeOrders(data);
}