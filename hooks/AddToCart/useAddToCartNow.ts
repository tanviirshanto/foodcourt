"use client";

import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { createCartItem, createCartItemLocal } from "@/redux/cartSlice";
import type { CartPostPayload } from "@/types/cart";
import type { ShopItem } from "@/types";
import { mapRecomToCartItem } from "@/components/AddToCart/mapRecomToCartItem";


export function useAddToCartNow(item: ShopItem) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const handleOrder = () => {
    const newItem = mapRecomToCartItem(item);

    const payload: CartPostPayload = {
      user_id: session?.user?.id ?? null,
      newItem,
    };

    if (session) {
      dispatch(createCartItem(payload));
    } else {
      dispatch(createCartItemLocal(payload));
    }
  };

  return {
    handleOrder,
    isLoggedIn: !!session,
  };
}
