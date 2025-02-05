"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const params = useParams();
  const [items, setItems] = useState([])
  const [shipping_charge, setShipping_charge] = useState(120);


  const userId = params.userId;
  const orderid = params.orderid;


  useEffect(() => {
    const fetchData = async () => {
      // console.log(userId, orderid);
      const response = await axios.get(
`/api/order/getorder/${userId}/${orderid}`
      );
       console.log(response);
      setItems(response.data.items)
      // setShipping_charge(response.data.shipping_charge);
    };
    fetchData();
  },[]);

async function handlePayment() {
  try {
    const response = await axios.post(
      "/api/checkout",
      {
        products: items,
        userId,
        orderid,
        shipping_charge,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.url) {
      window.location.href = response.data.url;
    }
  } catch (error) {
    console.error("Error during payment processing:", error);
  }
}

  return (
    <div className="h-screen max-w-screen flex justify-center items-center flex-col gap-10 ">
      <div className="text-4xl">Your order has been listed.</div>
      <div className="text-2xl">Order ID: { orderid }</div>
      <button
        type="button"
        className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-3xl px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
        onClick={handlePayment}
      >
        <Image
          src="/stripe.png"
          width={50}
          height={50}
          alt="logo"
          className="w-8 mr-5"
        />
        Pay with Stripe
      </button>
    </div>
  );
}

export default Page;
