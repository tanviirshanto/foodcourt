import { useAppDispatch } from "@/redux/hooks";
import {
  editCartItem,
  editCartItemLocal,
  removeCartItem,
  removeCartItemLocal,
} from "@/redux/cartSlice";
import { CartItem } from "@/types/cart";

export function useCartItem(item: CartItem, userId: string | null) {
  const dispatch = useAppDispatch();

  const updateQty = (qty: number) => {
    if (userId) {
      dispatch(editCartItem({ newItem: { ...item, quantity: qty }, user_id: userId }));
    } else {
      dispatch(editCartItemLocal({ id: item.id, newQty: qty }));
    }
  };

  const remove = () => {
    if (userId) dispatch(removeCartItem({ item_id: item.id, user_id: userId }));
    else dispatch(removeCartItemLocal(item.id));
  };

  return { updateQty, remove };
}
