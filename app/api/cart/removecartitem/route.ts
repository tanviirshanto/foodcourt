// app/api/cart/removecartitem/route.js
import { NextResponse } from "next/server";
import Cart from "@/models/cartModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PUT(request) {
  try {
    const { item_id, user_id } = await request.json();

    if (!item_id || !user_id) {
      return NextResponse.json({
        success: false,
        message: "Item ID and User ID are required",
      });
    }

    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return NextResponse.json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex((item) => item.id === item_id);

    if (itemIndex === -1) {
      return NextResponse.json({
        success: false,
        message: "Item not found in Cart",
      });
    }

    cart.items.splice(itemIndex, 1);

    // Recalculate the total amount and total time
    cart.total_amount = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    cart.total_time = cart.items.reduce(
      (total, item) => total + item.quantity * item.estimated_time,
      0
    );

    await cart.save();

    return NextResponse.json({
      success: true,
      message: "Item removed from Cart",
      data: cart,
    });
  } catch (error) {
    console.error("Error removing item from Cart", error);
    return NextResponse.json({
      success: false,
      message: "Error removing item from Cart",
    });
  }
}
