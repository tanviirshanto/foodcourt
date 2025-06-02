"use client";

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Page() {
  const params = useParams();
  const [items, setItems] = useState([]);
  const [shipping_charge, setShipping_charge] = useState(120);

  const userId = params.userId;
  const orderid = params.orderid;

const [userInfo, setUserInfo] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const orderRes = await axios.get(`/api/order/getorder/${userId}/${orderid}`);
    const userRes = await axios.get(`/api/user/${userId}`);

    setItems(orderRes.data.items);
    setUserInfo(userRes.data.data); // includes name, email, contact, address
  };

  fetchData();
}, []);


  async function handlePaymentWithStripe() {
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

async function handlePaymentWithSSLCommerz() {
  if (!userInfo) return;

  try {
    const full_total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const response = await axios.post(
      "/api/payment/sslcommerz/initiate",
      {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.contact,
        address: userInfo.address,
        items,
        amount: full_total + shipping_charge,
        user_id: userId,
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
    <div className="h-screen flex flex-col justify-center items-center bg-blue-50 relative overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md"
      >
        <Image
          src="/order-box.gif"
          width={150}
          height={150}
          alt="Order listed"
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold text-blue-600 mt-4">
          Your order has been listed!
        </h1>
        <p className="mt-3 text-gray-700 text-sm">Order ID: {orderid}</p>

        <button
          type="button"
          className="mt-6 text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-xl px-5 py-3 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600"
          onClick={handlePaymentWithStripe}
        >
          <Image
            src="/stripe.png"
            width={50}
            height={50}
            alt="logo"
            className="w-8 mr-4"
          />
          Pay with Stripe
        </button>
        <button
          type="button"
          className="mt-6 text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-xl px-5 py-3 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600"
          onClick={handlePaymentWithSSLCommerz}
        >
          <Image
            src="/sslcommerz.png"
            width={50}
            height={50}
            alt="logo"
            className="w-8 mr-4"
          />
          Pay with SSLCommerz
        </button>
      </motion.div>
    </div>
  );
}

export default Page;
