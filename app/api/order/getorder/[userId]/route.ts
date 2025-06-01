// app/api/order/getorder/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/orderModel";
import { connect } from "@/dbConfig/dbConfig";

interface Params {
  params: {
    userId: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const { userId } = params;

  try {
    await connect();
    console.log(`Fetching all orders for userId: ${userId}`);

    // Ensure userId is a valid ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Find all orders for the given userId
    const userOrders = await Order.find({ user_id: userObjectId });

    if (!userOrders || userOrders.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No orders found for the user",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userOrders,
    });
  } catch (error) {
    console.error("Error fetching orders", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching orders",
      },
      { status: 500 }
    );
  }
}
