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
  const [gateways, setGateways] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const userId = params.userId;
  const orderid = params.orderid;

  useEffect(() => {
    const fetchData = async () => {
      const orderRes = await axios.get(`/api/order/getorder/${userId}/${orderid}`);
      const userRes = await axios.get(`/api/user/${userId}`);
      setItems(orderRes.data.items);
      setUserInfo(userRes.data.data);
    };
    fetchData();
  }, []);

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
    } finally {
      setLoading(false);
    }
  }

  async function handlePaymentWithSSLCommerz() {
    if (!userInfo) return;

    try {
      setLoading(true);
      const full_total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const response = await axios.post("/api/payment/sslcommerz/initiate", {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.contact,
        address: userInfo.address,
        items,
        amount: full_total + shipping_charge,
        user_id: userId,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else if (response.data.desc?.length) {
        setGateways(response.data.desc);
        setShowModal(true);
      } else {
        alert("No payment options available.");
      }
    } catch (error) {
      console.error("SSLCommerz error:", error);
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

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Select a Payment Gateway</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {gateways.map((gateway) => (
                <a
                  key={gateway.gw}
                  href={gateway.redirectGatewayURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 border rounded-md hover:shadow"
                >
                  <img src={gateway.logo} alt={gateway.name} className="w-10 h-10 object-contain" />
                  <span>{gateway.name}</span>
                </a>
              ))}
            </div>
            <button
              className="mt-6 w-full text-white bg-red-600 hover:bg-red-700 py-2 rounded-md"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
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
          <Image src="/stripe.png" width={50} height={50} alt="Stripe" className="w-8 mr-4" />
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
