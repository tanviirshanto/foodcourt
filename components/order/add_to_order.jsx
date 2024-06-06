import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addtocart, createCartItem } from "@/redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";

function Add_to_order({ newItem, setShowModal }) {
  const { data: session } = useSession();
  let user_id = session?.user?.id;

  const dispatch = useDispatch();
  const postData = {
    newItem,
    user_id,
  };

  useEffect(() => {
    console.log(newItem);
  }, [newItem]);
  async function addItem(e) {
    e.preventDefault();
    // dispatch(addtocart(postData));

    if (session) {
      dispatch(createCartItem(postData));
    }
    setShowModal(false)
  }

  return (
    <button
      type="submit"
      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mt-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={addItem}
    >
      <svg
        className="me-1 -ms-1 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
      Order Now
    </button>
  );
}

export default Add_to_order;