import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  console.log("✅ SSLCommerz success redirect via GET");

  return NextResponse.redirect(
    new URL("/payment/success", process.env.NEXT_PUBLIC_BASE_URL!)
  );
}

export async function POST(req: NextRequest) {
  await connect();

  const formData = await req.formData();
  const status = formData.get("status");
  const tran_id = formData.get("tran_id");
  const val_id = formData.get("val_id");
  const order_sub_id = formData.get("value_a"); // This is the _id of the inner order

  console.log("✅ Payment Success POST:", { status, tran_id, order_sub_id });

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
        console.error("❌ Order not found for sub ID");
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      const index = parentOrder.orders.findIndex(
        (order) => order._id.toString() === order_sub_id
      );

      if (index === -1) {
        console.error("❌ Sub-order not found");
        return NextResponse.json({ error: "Sub-order not found" }, { status: 404 });
      }

      parentOrder.orders[index].payment = "paid";
      parentOrder.orders[index].tran_id = tran_id as string;
      parentOrder.orders[index].val_id = val_id as string;

      await parentOrder.save();

      console.log("✅ Sub-order payment updated");
    } catch (err) {
      console.error("❌ Error updating sub-order", err);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  } else {
    console.warn("❌ Invalid status or order_sub_id");
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  return NextResponse.redirect(
    new URL("/payment/success", process.env.NEXT_PUBLIC_BASE_URL!)
  );
}
