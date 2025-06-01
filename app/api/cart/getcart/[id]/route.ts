import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  try {
    await connect();
    const { id } = params;

    const cart = await Cart.findOne({ user_id: id });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: cart }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch cart" },
      { status: 400 }
    );
  }
}
