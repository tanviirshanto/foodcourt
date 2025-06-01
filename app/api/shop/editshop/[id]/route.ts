import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const { id } = params;
  const body = await req.json();

  try {
    const updatedShop = await Shop.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedShop) {
      return NextResponse.json(
        { success: false, message: "Shop not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, shop: updatedShop });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
