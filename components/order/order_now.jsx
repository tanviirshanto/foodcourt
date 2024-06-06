"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { createCartItem, createCartItemLocal } from "@/redux/cartSlice";

const Order_now = ({ item }) => {
  const [userId, setUserId] = useState(null);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const parsedItem = JSON.parse(item)
  
  useEffect(() => {
    // console.log(item)
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);
 


  const newItem = {
    id: parsedItem._id,
    name: parsedItem.name,
    category: parsedItem.category,
    estimated_time: parsedItem.estimated_time,
    quantity: 1,
    price: parsedItem.price,
    image:parsedItem.images[0],
  };


      const  postData ={
    user_id: userId,
    newItem,
  }

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("postData", postData)
    if (session) {
      const response = dispatch(createCartItem(postData));
    }
    else {
     const response = dispatch(createCartItemLocal(postData));
    }
    
    // console.log(response);
  }

  return (
    <div className=" bg-green-500 md:px-5 px-3 md:py-3 py-2 md:mb-4  rounded-xl w-32 md:w-36 text-white text-lg font-semibold cursor-pointer " onClick={handleClick} >
      Add to cart
    </div>
  );
};

export default Order_now;
