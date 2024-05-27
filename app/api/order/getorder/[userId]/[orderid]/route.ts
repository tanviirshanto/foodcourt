// app/api/order/getorder/[userId]/[orderId]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/orderModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request, { params }) {
  const { userId, orderid } = params;

  try {
    console.log(
      `Fetching order with userId: ${userId} and orderId: ${orderid}`
    );


    // Find the user order based on userId and orderId
  const userOrder = await Order.findOne(
    { user_id: userId, "orders._id": orderid },
    { "orders.$": 1 } // This projection returns only the matching order
  );

    // Check if the order was found
    if (!userOrder || userOrder.orders.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    // Return the found order
    return NextResponse.json({
      success: true,
      data: userOrder.orders[0],
    });
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
