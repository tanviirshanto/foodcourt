import Cart from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";


export async function DELETE(request: NextRequest) {
  try {
    await connect();
    const userId = request.nextUrl.searchParams.get("userid");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing 'userid' in query" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    cart.items = [];
    cart.total_amount = 0;
    cart.total_time = 0;

    await cart.save();

    return NextResponse.json(
      {
        success: true,
        message: "All items removed from cart",
        data: { cart },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing items from cart:", error);
    return NextResponse.json(
      { success: false, message: "Error removing items from cart" },
      { status: 500 }
    );
  }
}
