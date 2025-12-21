"use client";

import type { ShopItem } from "@/types/recommended";

import ShopItemImage from "./ShopItemImage";
import AddToCartNow from "../AddToCart/AddToCartNow";

export default function ShopItemCard({ item }: { item: ShopItem }) {
  return (
    <div className="relative w-72 sm:w-72 md:w-80 rounded-[2rem] shadow-2xl overflow-hidden group hover:scale-105 hover:-translate-y-2 transition-transform duration-500">
      <ShopItemImage item={item} />

      <div className="px-5 py-6 flex flex-col items-center text-center">
        <h3 className="text-gray-900 font-bold text-lg md:text-xl line-clamp-2 mb-4">
          {item.name}
        </h3>

        <div className="relative flex justify-center w-full">
          <div className="relative z-10">
            <AddToCartNow item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
