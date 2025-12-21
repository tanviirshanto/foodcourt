// types/shop.ts
import { Document } from "mongoose";

export interface ItemType {
  _id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  estimated_time: number;
  shop_name?: string;
}

export interface ShopType {
  _id?: string;
  name: string;
  image_url: string;
  items: ItemType[];
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

// Use `Document` with ShopType for type-safe documents
export type ShopDocument = Document & ShopType;
