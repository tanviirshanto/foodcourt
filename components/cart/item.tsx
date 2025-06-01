import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import {
  editCartItem,
  editCartItemLocal,
  removeCartItem,
  removeCartItemLocal,
} from "@/redux/cartSlice";
import { CartItem } from "@/types/cart";
import { useAppDispatch } from "@/redux/hooks";
import { AppDispatch } from "@/redux/store";

interface ItemProps {
  it: CartItem;
  user_id: string | null;
}

const Item: React.FC<ItemProps> = ({ it, user_id }) => {
  const [qty, setQty] = useState<number>(0);
  const dispatch = useAppDispatch();

  const postData = {
    item_id: it.id,
    user_id,
  };

  useEffect(() => {
    setQty(it.quantity);
  }, [it]);

  const handleIncDec = (name: "inc" | "dec") => {
    let newQty = qty;
    if (name === "inc") newQty = qty + 1;
    else if (qty > 1) newQty = qty - 1;
  
    if (user_id) {
      if (name === "dec" && qty === 1) {
        dispatch(removeCartItem(postData));
      } else {
        const newItem: CartItem = {
          ...it,
          quantity: newQty,
        };
        dispatch(editCartItem({ newItem, user_id }));
      }
    } else {
      if (name === "dec" && qty === 1) {
        dispatch(removeCartItemLocal(it.id));
      } else {
        dispatch(editCartItemLocal({ id: it.id, newQty }));
      }
    }
  };
  

  const handleRemove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (user_id) {
      dispatch(removeCartItem(postData));
    } else {
      dispatch(removeCartItemLocal(it.id));
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <Image
          src={it.image}
          height={300}
          width={300}
          alt="item photo"
          className="w-24 h-24 md:w-28"
        />
        <div className="flex flex-col justify-between text-lg pl-5">
          <h1>{it.name}</h1>
          <h1>
            Qty: <span>{qty}</span>
          </h1>
          <h1>
            Unit Price: <span>{it.price}</span>
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-between text-lg pr-2">
        <h1>{qty * it.price}</h1>
        <div className="space-x-2">
          <button onClick={() => handleIncDec("dec")} aria-label="Decrease quantity">
            <FaMinusCircle />
          </button>
          <button onClick={() => handleIncDec("inc")} aria-label="Increase quantity">
            <FaPlusCircle />
          </button>
        </div>
        <div
          className="text-lg hover:underline hover:text-slate-200 cursor-pointer"
          onClick={handleRemove}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleRemove(e as any);
          }}
        >
          Remove
        </div>
      </div>
    </div>
  );
};

export default Item;
