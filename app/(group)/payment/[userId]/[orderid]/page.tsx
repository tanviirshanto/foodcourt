"use client";

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Page() {
  const params = useParams();
  const [items, setItems] = useState([]);
  const [shipping_charge] = useState(120);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = params.userId;
  const orderid = params.orderid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, userRes] = await Promise.all([
          axios.get(`/api/order/getorder/${userId}/${orderid}`),
          axios.get(`/api/user/${userId}`),
        ]);

        setItems(orderRes.data.items);
        setUserInfo(userRes.data.data);
      } catch (error) {
        console.error("Error fetching order/user:", error);
      }
    };

    fetchData();
  }, [userId, orderid]);

  async function handlePaymentWithStripe() {
    try {
      setLoading(true);
      const response = await axios.post("/api/checkout", {
        products: items,
        userId,
        orderid,
        shipping_charge,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Stripe error:", error);
      alert("Stripe payment initiation failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePaymentWithSSLCommerz() {
    if (!userInfo) return;

    try {
      setLoading(true);
      const full_total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const response = await axios.post("/api/payment/sslcommerz/initiate", {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.contact,
        address: userInfo.address,
        items,
        amount: full_total + shipping_charge,
        user_id: userId,
      });

      const gatewayURL = response.data?.data?.GatewayPageURL;

      if (gatewayURL) {
        window.location.href = gatewayURL;
      } else {
        alert("Unable to redirect to payment gateway.");
      }
    } catch (error) {
      console.error("SSLCommerz error:", error);
      alert("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-50 relative overflow-hidden p-4">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src="/loading.gif" alt="Loading" width={50} height={50} />
            <p className="mt-4 text-lg font-semibold">Redirecting...</p>
          </div>
        </div>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full"
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
          className="mt-6 w-full text-white bg-[#050708] hover:bg-[#050708]/80 font-medium rounded-lg text-xl px-5 py-3 flex items-center justify-center"
          onClick={handlePaymentWithStripe}
        >
          <Image
            src="/stripe.png"
            width={50}
            height={50}
            alt="Stripe"
            className="w-8 mr-4"
          />
          Pay with Stripe
        </button>

        <button
          type="button"
          className="mt-4 w-full text-white bg-[#050708] hover:bg-[#050708]/80 font-medium rounded-lg text-xl px-5 py-3 flex items-center justify-center"
          onClick={handlePaymentWithSSLCommerz}
        >
          <Image
            src="/sslcommerz.png"
            width={50}
            height={50}
            alt="SSLCommerz"
            className="w-8 mr-4"
          />
          Pay with SSLCommerz
        </button>
      </motion.div>
    </div>
  );
}

export default Page;
