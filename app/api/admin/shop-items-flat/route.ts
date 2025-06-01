// /api/shop-items-flat/route.ts
import { NextResponse } from "next/server";
import Shop from "@/models/shopModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET() {
  await connect();

  const shops = await Shop.find({}, "name items");

  const flatItems = shops.flatMap((shop) =>
    shop.items.map((item: any) => ({
      _id: item._id,
      name: item.name,
      shopName: shop.name,
    }))
  );

  return NextResponse.json(flatItems);
}
