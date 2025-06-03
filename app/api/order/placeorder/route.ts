import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { SingleOrder } from "@/types/order";
import CartModel from "@/models/cartModel";
import mongoose from "mongoose";



interface RequestBody {
  user_id: string;
  orderData: SingleOrder;
}

export async function POST(request: NextRequest) {
  try { 
    await connect();
    const body: RequestBody = await request.json();
    const { user_id, orderData } = body;

    if (!user_id || !orderData) {
      return NextResponse.json({ error: "Incomplete data" }, { status: 400 });
    }

    let userOrder = await Order.findOne({ user_id });

    if (!userOrder) {
      userOrder = new Order({ user_id, orders: [] });
    }

    userOrder.orders.push(orderData);
    await userOrder.save();
    await CartModel.findOneAndDelete({ user_id: new mongoose.Types.ObjectId(user_id) });

    const createdOrder = userOrder.orders[userOrder.orders.length - 1];
    return NextResponse.json({ user_id, order: createdOrder }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
