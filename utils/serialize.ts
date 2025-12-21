import User from "@/models/userModel";
import Order from "@/models/orderModel";

export function serializeUser(user: any): any {
  return {
    ...user,
    _id: user._id.toString(),
  };
}

export function serializeOrders(data: any): any[] {
  return (data?.orders || []).map((order: any) => ({
    ...order,
    _id: order._id.toString(),
    order_date: order.order_date?.toISOString(),
    items: order.items.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
    })),
  }));
}
