// app/api/payment/initiate/route.ts
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import SSLCommerzPayment from "sslcommerz-lts";

const store_id = process.env.SSLC_STORE_ID!;
const store_passwd = process.env.SSLC_STORE_PASSWORD!;
const isLive = false; // true for production

export async function POST(req: NextRequest) {
  await connect();
  const body = await req.json();

  const tran_id = "tran_" + Date.now();

  const newOrder = {
    tran_id,
    name: body.name,
    email: body.email,
    address: body.address,
    contact: body.phone,
    items: body.items, // assume array of { id, name, quantity, price, etc. }
    full_total: body.amount,
    payment: "pending",
    shipping: "pending",
    shipping_charge: body.shipping_charge || 0,
  };

  // Save to database
  await Order.updateOne(
    { user_id: new Types.ObjectId(body.user_id) },
    { $push: { orders: newOrder } },
    { upsert: true }
  );

  // Prepare SSLCommerz payload
  const data = {
    total_amount: body.amount,
    currency: "BDT",
    tran_id,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
    fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`,
    ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/ipn`,
    shipping_method: "Courier",
    product_name: "Food Order",
    product_category: "Food",
    product_profile: "general",
    cus_name: body.name,
    cus_email: body.email,
    cus_add1: body.address,
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: body.phone,
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, isLive);

  try {
    const response = await sslcz.init(data);
    return NextResponse.json({ url: response.GatewayPageURL });
  } catch (error) {
    return NextResponse.json(
      { error: "Payment initiation failed", details: error },
      { status: 500 }
    );
  }
}
