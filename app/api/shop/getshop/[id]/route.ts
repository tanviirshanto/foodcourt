import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();

    const shop = await Shop.findById(params.id);
    if (!shop) {
      return NextResponse.json({ success: false, message: "Shop not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, shop });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
