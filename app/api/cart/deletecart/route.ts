import Cart from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userid");

    console.log("userId", userId);

    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return NextResponse.json({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove all items from the cart
    cart.items = [];

    // Update total_amount and total_time to 0
    cart.total_amount = 0;
    cart.total_time = 0;

    await cart.save();

    return NextResponse.json({
      success: true,
      message: "All items removed from Cart",
      data: {
        cart,
      },
    });
  } catch (error) {
    console.error("Error removing items from Cart", error);
    return NextResponse.json({
      success: false,
      message: "Error removing items from Cart",
    });
  }
}
