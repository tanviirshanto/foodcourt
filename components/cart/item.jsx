import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import {
  editCartItem,
  editCartItemLocal,
  removeCartItem,
  removeCartItemLocal,
} from "@/redux/cartSlice";

const Item = ({ it, user_id }) => {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const postData = {
    item_id: it?.id,
    user_id,
  };

  useEffect(() => {
    setQty(it.quantity);
  }, [it]);

  const handleIncDec = (name) => {
    let newQty = qty;
    if (name === "inc") {
      newQty = qty + 1;
      setQty(newQty);
    } else {
      if (qty === 1) {
        if (user_id) {dispatch(removeCartItem(postData)); return}
        else {dispatch(removeCartItemLocal(it.id)); return}
      }
      if (qty > 0) {
        newQty = qty - 1;
        setQty(newQty);
      }
    }
    if (user_id) {
      if (name === "inc" || (name === "dec" && newQty > 0)) {
        const newItem = {
          id: it.id,
          name: it.name,
          category: it.category,
          estimated_time: it.estimated_time,
          quantity: newQty,
          price: it.price,
          image: it.image,
        };

        const editData = {
          newItem,
          user_id,
        };

        dispatch(editCartItem(editData));
      }
    } else {
      dispatch(editCartItemLocal({ id: it.id, newQty }));
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    if (user_id) {
      dispatch(removeCartItem(postData));
    } else {
      dispatch(removeCartItemLocal(it.id));
    }
  };
  return (
    <div className="flex justify-between   ">
      <div className="flex">
        <Image
          src={it.image}
          height={300}
          width={300}
          alt="item photo"
          className="w-24 h-24 md:w-28"
        />
        <div className="flex flex-col justify-between text-lg pl-5">
          <h1>{it.name} </h1>
          <h1>
            {" "}
            Qty: <span>{qty}</span>{" "}
          </h1>
          <h1>
            {" "}
            Unit Price: <span>{it.price}</span>{" "}
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-between text-lg pr-2 ">
        <h1>{it.quantity * it.price}</h1>
        <div className="space-x-2">
          <button onClick={() => handleIncDec("dec")}>
            <FaMinusCircle />
          </button>
          <button onClick={() => handleIncDec("inc")}>
            <FaPlusCircle />
          </button>
        </div>
        <div
          className="text-lg hover:underline hover:text-slate-200 cursor-pointer"
          onClick={handleRemove}
        >
          Remove
        </div>
      </div>
    </div>
  );
};
export default Item;
