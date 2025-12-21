import Image from "next/image";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { CartItem } from "@/types/cart";
import { useCartItem } from "@/hooks/Cart/useCartItem";

export default function CartItemRow({
  item,
  userId,
}: {
  item: CartItem;
  userId: string | null;
}) {
  const { updateQty, remove } = useCartItem(item, userId);

  return (
    <div className="flex justify-between text-black">
      <div className="flex gap-4">
        <Image src={item.image} width={80} height={80} alt={item.name} />
        <div>
          <p>{item.name}</p>
          <p>Qty: {item.quantity}</p>
          <p>Price: {item.price}</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p>{item.quantity * item.price}</p>
        <div className="flex gap-2">
          <FaMinusCircle
            onClick={() =>
              item.quantity > 1 ? updateQty(item.quantity - 1) : remove()
            }
          />
          <FaPlusCircle onClick={() => updateQty(item.quantity + 1)} />
        </div>
        <button onClick={remove}>Remove</button>
      </div>
    </div>
  );
}
