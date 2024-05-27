import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connect();

  try {
    const cart = await Cart.findOne({ user_id: id });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
