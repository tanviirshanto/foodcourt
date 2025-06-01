// app/api/shops/route.js
import {connect} from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();

  try {
    const shops = await Shop.find();
    return NextResponse.json(shops );
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
