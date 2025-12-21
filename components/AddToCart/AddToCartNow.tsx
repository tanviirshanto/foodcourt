"use client";

import type { ShopItem } from "@/types";

import AddToCartButton from "./AddToCartButton";
import { useAddToCartNow } from "@/hooks/AddToCart/useAddToCartNow";

export default function AddToCartNow({ item }: { item: ShopItem }) {
  const { handleOrder } = useAddToCartNow(item);

  return <AddToCartButton onClick={handleOrder} />;
}
