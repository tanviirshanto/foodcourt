import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";

export const GET = async () => {
  try {
    await connect();
    const shops = await Shop.find();
    return NextResponse.json({ success: true, shops });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
};
