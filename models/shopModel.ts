// models/shopModel.ts
import mongoose, { Schema, model, models, Model } from "mongoose";
import { ItemType, ShopDocument } from "@/types/shop";

// Item schema
const itemSchema = new Schema<ItemType>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  estimated_time: { type: Number, required: true },
});

// Shop schema
const shopSchema = new Schema<ShopDocument>(
  {
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    items: { type: [itemSchema], required: true },
  },
  {
    timestamps: true,
    versionKey: "__v",
  }
);

// Model definition
const Shop: Model<ShopDocument> = models.shops || model<ShopDocument>("shops", shopSchema);

export default Shop;
