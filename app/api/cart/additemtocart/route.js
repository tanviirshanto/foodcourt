import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { getSession } from "next-auth/react";
import Cart from "../../../../models/cartModel";
connect();

export async function POST(request, response) {
  // Connect to MongoDB
  // try {

  const body = await request.json();
  // console.log(body)
  const { newItem, user_id } = body;

  const {
    id,
    name,
    price,
    quantity,
    // totaltime,
    estimated_time,
    // subtotal,
    category,
    image,
  } = newItem;
  // console.log(user_id);
  if (!user_id || !id || !quantity) {
    // return response.status(400).json({ error: "Incomplete data" });
    return NextResponse.json({ error: "Incomplete data" }, { status: 400 });
  }

  // Find the user's cart based on the user ID
  let userCart = await Cart.findOne({ user_id });

  if (!userCart) {
    // Create a new cart if it doesn't exist for the user
    userCart = new Cart({ user_id, items: [], total_amount: 0 });
  }

  if (userCart) {
    // Check if the item already exists in the cart
    const existingItemIndex = userCart.items.findIndex((item) => {
      console.log(item.id.toString(), id.toString());

      return item.id.toString() === id.toString();
    });
    console.log(existingItemIndex);
    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity
      userCart.items[existingItemIndex].quantity += parseInt(quantity);
      userCart.items[existingItemIndex].subtotal =
        parseInt(quantity) * parseInt(price);
      console.log(userCart.items[existingItemIndex].subtotal);
    } else {
      // Otherwise, add the item to the cart
      const itemToAdd = {
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
  }

  await userCart
    .save()
    .then((userCart) => {
      console.log("Item added to cart", userCart);
      // Handle successful save
    })
    .catch((error) => {
      console.error("Error adding to cart", error);
      // Handle error
    });

  return NextResponse.json(userCart);
}
