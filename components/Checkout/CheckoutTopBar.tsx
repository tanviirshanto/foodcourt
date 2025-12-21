// components/Checkout/CheckoutTopBar.tsx
"use client";

import React from "react";

interface CheckoutTopBarProps {
  orderid: string;
  itemsLength: number;
  paymentPill: React.ReactNode; 
  shippingPill: React.ReactNode; 
  payment: string;
  shipping: string;
}

const CheckoutTopBar = ({
  orderid,
  itemsLength,
  paymentPill,
  shippingPill,
  payment,
  shipping,
}: CheckoutTopBarProps) => {
  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Choose a payment method to complete your order.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Order ID: {orderid}
          </span>
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
            Items: {itemsLength}
          </span>
          {paymentPill}
          {shippingPill}
        </div>
      </div>
    </div>
  );
};

export default CheckoutTopBar;
