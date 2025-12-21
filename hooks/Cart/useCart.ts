import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCartItems, getDataFromLocal } from "@/redux/cartSlice";
import { CartState } from "@/types/cart";

export function useCart() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const cart = useAppSelector((state) => state.cart) as CartState;

  const userId = session?.user?.id ?? null;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems({ user_id: userId }));
    } else {
      dispatch(getDataFromLocal());
    }
  }, [userId, dispatch]);

  const shipping = cart.data?.items?.length ? 100 : 0;
  const subtotal = cart.data?.total_amount ?? 0;
  const total = subtotal + shipping;

  return {
    cart: cart.data,
    userId,
    shipping,
    subtotal,
    total,
  };
}
