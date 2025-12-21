import Image from "next/image";
import ShopItemPrice from "./ShopItemPrice";
import type { ShopItem } from "@/types/recommended";

export default function ShopItemImage({ item }: { item: ShopItem }) {
  return (
    <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
      <Image
        src={item.images[0]}
        alt={item.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <ShopItemPrice price={item.price} />
    </div>
  );
}
