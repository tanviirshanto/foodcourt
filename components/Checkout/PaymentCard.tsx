"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PaymentCard({
  total,
  grandTotal,
  stripeLoading,
  sslLoading,
  onStripe,
  onSSL,
}: {
  total: any;
  grandTotal: number;
  stripeLoading: boolean;
  sslLoading: boolean;
  onStripe: () => void;
  onSSL: () => void;
}) {
  return (
    <div className="lg:sticky lg:top-6">
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className="rounded-3xl bg-white/80 backdrop-blur border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-8"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-extrabold">৳</span>
          </div>

          <Image
            src="/order-box.gif"
            width={170}
            height={170}
            alt="Order Illustration"
            className="mx-auto mb-4 rounded-2xl shadow-sm"
          />

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Complete payment
          </h3>
          <p className="mt-2 text-gray-500">
            Pay securely and get instant confirmation.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
            Total: <span className="text-gray-900">BDT. {total ?? grandTotal}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {/* Stripe */}
          <button
            onClick={onStripe}
            disabled={stripeLoading || sslLoading}
            className="group w-full rounded-2xl px-4 py-4 text-base font-semibold text-white shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] hover:opacity-95 active:scale-[0.99]"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <Image src="/stripe.png" width={34} height={34} alt="Stripe" />
              </span>
              <span className="text-lg">
                {stripeLoading ? "Redirecting…" : "Pay with Stripe"}
              </span>
            </span>
            <p className="mt-2 text-xs text-white/85">
              Card / International payments
            </p>
          </button>

          {/* SSLCommerz */}
          <button
            onClick={onSSL}
            disabled={stripeLoading || sslLoading}
            className="w-full rounded-2xl px-4 py-4 text-base font-semibold text-gray-900 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed bg-white ring-1 ring-gray-200 hover:bg-gray-50 active:scale-[0.99]"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 ring-1 ring-gray-200">
                <Image
                  src="/sslcommerz.png"
                  width={90}
                  height={36}
                  alt="SSLCommerz"
                />
              </span>
              <span className="text-lg">
                {sslLoading ? "Redirecting…" : "Pay with SSLCommerz"}
              </span>
            </span>
            <p className="mt-2 text-xs text-gray-500">
              bKash / Nagad / Cards / Bank
            </p>
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Please retry once or contact support.
          </p>
        </div>
      </motion.div>

      <p className="mt-4 text-center text-xs text-gray-400">
        Payments are redirected to official gateways.
      </p>
    </div>
  );
}
