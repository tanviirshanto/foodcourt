import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await connect();

  const formData = await req.formData();

  const status = formData.get("status");
  const tran_id = formData.get("tran_id");
  const val_id = formData.get("val_id");
  const order_sub_id = formData.get("value_a");

  console.log("SSLCommerz DEMO POST Received:", { status, tran_id, order_sub_id });

  if (
    status === "VALID" &&
    tran_id &&
    mongoose.Types.ObjectId.isValid(order_sub_id as string)
  ) {
    try {
      const parentOrder = await Order.findOne({
        "orders._id": order_sub_id,
      });

      if (!parentOrder) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      const index = parentOrder.orders.findIndex(
        (order) => order._id.toString() === order_sub_id
      );

      if (index === -1) {
        return NextResponse.json({ error: "Sub-order not found" }, { status: 404 });
      }

      parentOrder.orders[index].payment = "paid";
      parentOrder.orders[index].tran_id = tran_id as string;
      parentOrder.orders[index].val_id = val_id as string;

      await parentOrder.save();
      console.log("Sub-order marked as paid");
    } catch (err) {
      console.error("❌ Payment processing error", err);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  } else {
    console.warn("❌ Invalid POST data from SSLCommerz");
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Final redirect for the browser
  return NextResponse.redirect(new URL("/payment/success", process.env.NEXT_PUBLIC_BASE_URL!));
}

// Optional GET handler (if someone hits this route manually)
export async function GET() {
  return NextResponse.redirect(new URL("/payment/success", process.env.NEXT_PUBLIC_BASE_URL!));
}
