import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import { CartItem } from "@/types"; // Assuming your types are in a `types` directory


export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const { newItem, user_id } = body;

    const {
      id,
      name,
      price,
      quantity,
      estimated_time,
      category,
      image,
    } = newItem;

    if (!user_id || !id || !quantity) {
      return NextResponse.json({ error: "Incomplete data" }, { status: 400 });
    }

    let userCart = await Cart.findOne({ user_id });

    if (!userCart) {
      userCart = new Cart({ user_id, items: [], total_amount: 0 });
    }

    const existingItemIndex = userCart.items.findIndex(
      (item: CartItem) => item.id.toString() === id.toString()
    );

    if (existingItemIndex !== -1) {
      userCart.items[existingItemIndex].quantity += parseInt(quantity);
    } else {
      const itemToAdd: CartItem = {
        id,
        name,
        price,
        quantity,
        estimated_time,
        category,
        image,
      };
      userCart.items.push(itemToAdd);
    }

    await userCart.save();
    console.log("Cart updated successfully:", userCart);

    return NextResponse.json(userCart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
