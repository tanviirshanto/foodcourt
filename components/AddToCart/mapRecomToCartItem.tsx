import type { ShopItem } from "@/types";
import type { CartItem } from "@/types/cart";

export function mapRecomToCartItem(
  item: ShopItem
): CartItem {
  return {
    id: item._id,
    name: item.name,
    category: item.category,
    estimated_time: item.estimated_time,
    quantity: 1,
    price: item.price,
    image: item.images[0],
  };
}
