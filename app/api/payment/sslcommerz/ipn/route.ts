import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";

export async function POST(req: NextRequest) {
  await connect();

  const formData = await req.formData();
  const tran_id = formData.get("tran_id")?.toString();
  const status = formData.get("status")?.toString(); // Should be 'VALID' or 'FAILED'

  if (!tran_id) {
    return NextResponse.json({ success: false, message: "Missing transaction ID" }, { status: 400 });
  }

  try {
    const updated = await Order.updateOne(
      { "orders.tran_id": tran_id },
      {
        $set: {
          "orders.$.payment": status === "VALID" ? "paid" : "pending",
          "orders.$.shipping": status === "VALID" ? "pending" : "cancelled",
        },
      }
    );

    if (updated.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Order updated from IPN" });
  } catch (err) {
    console.error("IPN Update Error:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
