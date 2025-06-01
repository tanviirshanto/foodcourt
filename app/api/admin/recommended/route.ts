// API Route: /app/api/recommended/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Recommended from "@/models/recommendedModel";
import Shop from "@/models/shopModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET() {
  await connect();
  const items = await Recommended.find();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connect();

  const recommendedCount = await Recommended.countDocuments();
  if (recommendedCount >= 6) {
    return NextResponse.json({ error: "Maximum of 6 recommended items allowed." }, { status: 400 });
  }

  const { itemId } = await req.json();
  if (!itemId) {
    return NextResponse.json({ error: "Item ID required" }, { status: 400 });
  }

  // Find the shop and item
  const shop = await Shop.findOne({ "items._id": itemId }, { "items.$": 1, name: 1 });
  if (!shop || !shop.items?.length) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const item = shop.items[0];

  // Check if item already recommended (by name + shop_name)
  const alreadyExists = await Recommended.findOne({
    name: item.name,
    shop_name: shop.name,
  });

  if (alreadyExists) {
    return NextResponse.json({ error: "This item is already recommended." }, { status: 400 });
  }

  const recommended = await Recommended.create({
    shop_name: shop.name,
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description,
    images: item.images,
    estimated_time: item.estimated_time,
  });

  return NextResponse.json(recommended);
}


export async function DELETE(req: NextRequest) {
  await connect();
  const { id } = await req.json();
  await Recommended.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
