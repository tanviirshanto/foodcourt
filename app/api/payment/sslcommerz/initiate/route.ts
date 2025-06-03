// app/api/sslcommerz/payment/initiate/route.ts
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

  const tran_id = Math.floor(100000 + Math.random() * 900000).toString();
  const initUrl = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

  // Prepare SSLCommerz payload
  const data = {
    store_id,
    store_passwd,
    total_amount: body.amount,
    currency: "BDT",
    tran_id,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/payment/success`,
    fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/sslcommerz/fail`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/sslcommerz/cancel`,
    ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/sslcommerz/ipn`,
    cus_name: body.name,
    cus_email: body.email,
    cus_add1: body.address,
    cus_add2: body.address,
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1212",
    cus_country: "Bangladesh",
    cus_phone: body.phone,
    cus_fax: "01712345678",
    shipping_method: "YES",
    ship_name: body.name,
    ship_add1: body.address,
    ship_add2: body.address,
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_country: "Bangladesh",
    ship_postcode: "1212",
    product_name: "Food Order",
    product_category: "Food",
    product_profile: "profile",
    product_amount: "3",
    user_id: body.user_id,
    order_id: body.order_id,
  };

  const formData = new FormData();

  // Populate FormData
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  console.log("SSLCommerz Initiation Data:", formData);

  const reqOptions = {method: "POST", body: formData};

  let SSLRes= await fetch(initUrl, reqOptions);

  let SSLResJSON = await SSLRes.json();

  return NextResponse.json({ data: SSLResJSON });


}
