"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

function CheckoutPage() {
  const params = useParams();
  const userId = params.userId;
  const orderid = params.orderid;

  const [order, setOrder] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [sslLoading, setSslLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, userRes] = await Promise.all([
          axios.get(`/api/order/getorder/${userId}/${orderid}`),
          axios.get(`/api/user/${userId}`),
        ]);
        setOrder(orderRes.data);
        setUserInfo(userRes.data.data);
      } catch (error) {
        console.error("Error fetching order/user:", error);
      }
    };

    if (userId && orderid) fetchData();
  }, [userId, orderid]);

  const shipping_charge = order?.shipping_charge || 120;

  async function handlePaymentWithStripe() {
    try {
      setStripeLoading(true);
      const response = await axios.post("/api/checkout", {
        products: order.items,
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
      setStripeLoading(false);
    }
  }

  async function handlePaymentWithSSLCommerz() {
    if (!userInfo) return;

    try {
      setSslLoading(true);
      const full_total = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const response = await axios.post("/api/payment/sslcommerz/initiate", {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.contact,
        address: userInfo.address,
        items: order.items,
        amount: full_total + shipping_charge,
        user_id: userId,
        order_id: orderid,
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
      setSslLoading(false);
    }
  }

  if (!order || !userInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 to-white">
        <p className="text-gray-500 text-lg font-semibold animate-pulse">
          Loading order details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto p-8 gap-12 bg-gradient-to-br from-indigo-50 via-white to-gray-100 pt-[100px]">
      {/* ORDER DETAILS */}
      <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-8 flex flex-col">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center tracking-wide drop-shadow-sm">
          Your Order Summary
        </h2>
        <ul className="flex flex-col gap-6 overflow-y-auto max-h-[480px] pr-4">
          {order.items.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-5 border-b border-gray-200 pb-4"
            >
              <div className="relative w-20 h-20 flex-shrink-0">
                <span className="absolute -top-1 -left-1 bg-indigo-600 text-white rounded-full text-xs px-2 py-0.5 font-semibold shadow-md z-10">
                  x{item.quantity}
                </span>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl shadow-sm"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <p className="font-semibold text-lg text-gray-900">{item.name}</p>
                <p className="text-sm text-indigo-500 tracking-wide">{item.category}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Estimated Time:{" "}
                  <span className="font-semibold">
                    {item.estimated_time * item.quantity} mins
                  </span>
                </p>
              </div>
              <div className="text-indigo-700 font-bold text-lg whitespace-nowrap">
                BDT. {item.price * item.quantity}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 border-t border-gray-300 text-gray-700">
          <div className="flex justify-between text-base font-medium mb-3">
            <span>Shipping Charge:</span>
            <span>BDT. {order.shipping_charge}</span>
          </div>
          <div className="flex justify-between text-xl font-extrabold text-indigo-800 mb-6">
            <span>Total Amount:</span>
            <span>BDT. {order.full_total}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-indigo-600">Shipping Status:</span>
              <p>{order.shipping}</p>
            </div>
            <div>
              <span className="font-semibold text-indigo-600">Payment Status:</span>
              <p>{order.payment}</p>
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-indigo-600">Shipping Address:</span>
              <p className="text-gray-800 break-words">{order.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT SECTION */}
      <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-center items-center relative">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="w-full max-w-md text-center"
        >
          <Image
            src="/order-box.gif"
            width={180}
            height={180}
            alt="Order Illustration"
            className="mx-auto mb-8 rounded-lg drop-shadow-lg"
          />
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-3 tracking-tight">
            Complete Your Payment
          </h1>
          <p className="mb-8 text-gray-600 text-lg tracking-wide">
            Order ID:{" "}
            <span className="font-semibold text-indigo-900">{orderid}</span>
          </p>

          <button
            onClick={handlePaymentWithStripe}
            disabled={stripeLoading || sslLoading}
            className="w-full mb-5 flex items-center justify-center gap-5 bg-indigo-500 hover:bg-indigo-800 transition-colors duration-300 text-white font-semibold rounded-lg py-4 text-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image src="/stripe.png" width={42} height={42} alt="Stripe" />
            {stripeLoading ? "Redirecting..." : "Pay with Stripe"}
          </button>

          <button
            onClick={handlePaymentWithSSLCommerz}
            disabled={stripeLoading || sslLoading}
            className="w-full flex items-center justify-center gap-5 bg-indigo-500 hover:bg-indigo-700 transition-colors duration-300 text-white font-semibold rounded-lg py-4 text-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image src="/sslcommerz.png" width={96} height={42} alt="SSLCommerz" />
            {sslLoading ? "Redirecting..." : "Pay with SSLCommerz"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default CheckoutPage;
