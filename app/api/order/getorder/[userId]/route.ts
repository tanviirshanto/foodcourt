// app/api/order/getorder/[userId]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/orderModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request, { params }) {
  const { userId } = params;

  try {
    console.log(`Fetching all orders for userId: ${userId}`);

    // Find all orders for the given userId
    const userOrders = await Order.find({ user_id: userId });

    // Check if any orders were found
    if (!userOrders || userOrders.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No orders found for the user",
        },
        { status: 404 }
      );
    }

    // Return the found orders
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
