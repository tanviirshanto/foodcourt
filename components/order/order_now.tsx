"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { createCartItem, createCartItemLocal } from "@/redux/cartSlice";
import type { CartItem, CartPostPayload } from "@/types/cart";
import { useAppDispatch } from "@/redux/hooks";
import { Recommended } from "@/types";

interface OrderNowProps {
  item: Recommended;
}

const Order_now: React.FC<OrderNowProps> = ({ item }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  const newItem: CartItem = {
    id: item._id,
    name: item.name,
    category: item.category,
    estimated_time: item.estimated_time,
    quantity: 1,
    price: item.price,
    image: item.images[0],
  };

  const postData: CartPostPayload = {
    user_id: userId,
    newItem,
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (session) {
      dispatch(createCartItem(postData));
    } else {
      dispatch(createCartItemLocal(postData));
    }
  };

  return (
    <div
      className="bg-green-600 md:px-5 px-3  py-2 md:mb-4 rounded-xl w-32 md:w-36 text-slate-50 text-lg font-medium cursor-pointer"
      onClick={handleClick}
    >
      Add to cart
    </div>
  );
};

export default Order_now;

