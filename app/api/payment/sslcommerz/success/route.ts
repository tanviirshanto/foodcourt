import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";

export async function POST(req: NextRequest) {
  await connect();

  const formData = await req.formData(); // ✅ Parse incoming form data

  const status = formData.get("status");
  const tran_id = formData.get("tran_id");
  const val_id = formData.get("val_id");
  const order_id = formData.get("order_id");

  console.log("✅ SSLCommerz Success POST:", { status, tran_id, order_id });

  if (status === "VALID" && order_id) {
    try {
      await Order.findByIdAndUpdate(order_id, {
        paymentStatus: "Paid",
        transactionId: tran_id,
        val_id,
      });
      console.log("✅ Order updated successfully");
    } catch (error) {
      console.error("❌ Error updating order:", error);
    }
  }

  return NextResponse.redirect(new URL("/payment/success", req.url));
}

export async function GET(req: NextRequest) {
  // This handles user redirection from SSLCommerz
  return NextResponse.redirect(new URL("/payment/success", req.url));
}
