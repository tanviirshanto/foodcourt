import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";

export async function POST(req: NextRequest) {
  console.log("🔔 IPN HIT");

  await connect();

  const formData = await req.formData();

  const status = formData.get("status");
  const tran_id = formData.get("tran_id");
  const val_id = formData.get("val_id");
  const order_id = formData.get("order_id");

  console.log("✅ IPN data:", { status, tran_id, val_id, order_id });

  if (status === "VALID" && order_id) {
    try {
      await Order.findByIdAndUpdate(order_id, {
        paymentStatus: "Paid",
        transactionId: tran_id,
        val_id,
      });
      console.log("✅ Order updated via IPN");
    } catch (err) {
      console.error("❌ IPN DB update failed:", err);
    }
  }

  return NextResponse.json({ message: "IPN processed" });
}
