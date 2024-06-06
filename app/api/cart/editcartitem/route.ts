import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getSession } from "next-auth/react";
import Cart from "@/models/cartModel";
connect();

export async function PUT(request:NextRequest, response:NextResponse) {
 
  const body = await request.json();
  const { newItem, user_id } = body;

  const { id, name, category, estimated_time, image, quantity, price } =
    newItem;
console.log("quantity", quantity);
  if (!user_id || !id || !quantity) {
    return NextResponse.json({ error: "Incomplete data" }, { status: 400 });
  }

  let userCart = await Cart.findOne({ user_id });

  if (!userCart) {
    return NextResponse.json("No cart found")
  }

  if (userCart) {
    const existingItemIndex = userCart.items.findIndex((item:any) => {
      console.log(item.id.toString(), id.toString());
      return item.id.toString() === id.toString();
    });
      
    if (existingItemIndex !== -1 ) {
      userCart.items[existingItemIndex] = newItem;
      userCart.items[existingItemIndex].subtotal =
        parseInt(quantity) * parseInt(price);
      console.log(userCart.items[existingItemIndex].subtotal);
    }
    
    else {
      return NextResponse.json("Item not found");
    }
  }

  await userCart
    .save()
    .then((userCart:any) => {
      console.log("Item added to cart", userCart);
      
    })
    .catch((error:any) => {
      console.error("Error adding to cart", error);
      
    });

  return NextResponse.json(userCart);
}
