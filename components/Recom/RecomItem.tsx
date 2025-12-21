"use client";

import type { ShopItem } from "@/types/recommended";
import ShopItemCard from "../Shop/ShopItemCard";

type Props = {
  item: ShopItem;
  index: number;
};

export default function RecomItem({ item, index }: Props) {
  return (
    <div
      className="transform transition duration-500 hover:-translate-y-3"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <ShopItemCard item={item} />
    </div>
  );
}
