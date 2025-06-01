import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import CartModel from "@/models/cartModel";
import { CartItem } from "@/types/cart";



interface RequestBody {
  newItem: CartItem;
  user_id: string;
}

export async function PUT(request: NextRequest) {
  try {
    await connect();
    const body: RequestBody = await request.json();
    const { newItem, user_id } = body;
    const { id, quantity, price } = newItem;

    if (!user_id || !id || !quantity) {
      return NextResponse.json({ error: "Incomplete data" }, { status: 400 });
    }

    const userCart = await CartModel.findOne({ user_id });

    if (!userCart) {
      return NextResponse.json({ error: "No cart found" }, { status: 404 });
    }

    const existingItemIndex = userCart.items.findIndex(
      (item: CartItem) => item.id.toString() === id.toString()
    );

    if (existingItemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    userCart.items[existingItemIndex] = {
      ...newItem,
      subtotal: newItem.quantity * newItem.price,
    };

    await userCart.save();

    return NextResponse.json(userCart, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
