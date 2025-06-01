import { connect } from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  await connect();

  try {
    const shop = await Shop.findByIdAndUpdate(id, await request.json(), {
      new: true,
      runValidators: true,
    });

    if (!shop) {
      return NextResponse.json(
        { success: false, message: "Shop not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: shop });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await connect();

  try {
    const deletedShop = await Shop.deleteOne({ _id: id });

    if (!deletedShop) {
      return NextResponse.json(
        { success: false, message: "Shop not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
