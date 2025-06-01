// app/api/shops/add/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";

export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();

    const newShop = await Shop.create(body);
    return NextResponse.json({ success: true, shop: newShop });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
