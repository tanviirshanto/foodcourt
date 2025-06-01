// app/api/order/getorder/[userId]/[orderId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/orderModel";
import { connect } from "@/dbConfig/dbConfig";

interface Params {
  params: {
    userId: string;
    orderid: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const { userId, orderid } = params;

  try {
    await connect();

    console.log(`Fetching order with userId: ${userId} and orderId: ${orderid}`);

    // Find the user order based on userId and orderId
    const userOrder = await Order.findOne(
      { user_id: new mongoose.Types.ObjectId(userId), "orders._id": orderid },
      { "orders.$": 1 } // projection to get only the matched order
    );

    if (!userOrder || !userOrder.orders || userOrder.orders.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(userOrder.orders[0]);
  } catch (error) {
    console.error("Error fetching order", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching order",
      },
      { status: 500 }
    );
  }
}
