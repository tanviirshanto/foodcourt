import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Recommended from "@/models/recommendedModel";
import mongoose from "mongoose";

connect();

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const { item } = body;

  if (!item) {
    return NextResponse.json({ error: "Incomplete data" }, { status: 400 });
  }

  // Create a new Recommended item
  const newItem = new Recommended({
    ...item,
     // Ensure _id is set
  });

  // Save the new item to the database
  try {
    const savedItem = await newItem.save();
    console.log("Item added to Recommended", savedItem);
    return NextResponse.json(savedItem);
  } catch (error) {
    console.error("Error adding to Recommended", error);
    return NextResponse.json(
      { error: "Error adding to Recommended" },
      { status: 500 }
    );
  }
}
