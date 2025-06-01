import { NextResponse } from "next/server";
import Cart from "@/models/cartModel";
import { connect } from "@/dbConfig/dbConfig";
import type { CartItem } from "@/types"; 



export async function PUT(request: Request) {
  try {
    await connect();
    const { item_id, user_id }: { item_id: string; user_id: string } = await request.json();

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

    // Ensure the items are treated as CartItem[]
    const items: CartItem[] = cart.items;

    const itemIndex = items.findIndex((item: CartItem) => item.id === item_id);

    if (itemIndex === -1) {
      return NextResponse.json({
        success: false,
        message: "Item not found in Cart",
      });
    }

    items.splice(itemIndex, 1); // Remove item

    // Recalculate totals
    const total_amount = items.reduce(
      (sum: number, item: CartItem) => sum + item.quantity * item.price,
      0
    );

    const total_time = items.reduce(
      (sum: number, item: CartItem) => sum + item.quantity * item.estimated_time,
      0
    );

    cart.items = items;
    cart.total_amount = total_amount;
    cart.total_time = total_time;

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
