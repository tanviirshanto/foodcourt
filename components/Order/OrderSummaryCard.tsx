"use client";

import { Link } from "nextjs13-progress";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { pill } from "./StatusPill";

export default function OrderSummaryCard({
  order,
  user_id,
  itemsTotal,
}: {
  order: any;
  user_id: string | null;
  itemsTotal: number;
}) {
  const payment = (order?.payment || "").toString().toLowerCase();
  const shipping = (order?.shipping || "").toString().toLowerCase();

  const paymentPillClass =
    payment === "paid" || payment === "success"
      ? pill("green")
      : payment === "pending"
      ? pill("yellow")
      : payment
      ? pill("red")
      : pill("gray");

  const shippingPillClass =
    shipping.includes("delivered") || shipping.includes("complete")
      ? pill("green")
      : shipping.includes("pending") || shipping.includes("processing")
      ? pill("yellow")
      : shipping
      ? pill("gray")
      : pill("gray");

  return (
    <div className="lg:sticky lg:top-6">
      <div className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6">
        <h3 className="text-lg font-extrabold text-gray-900">Summary</h3>
        <p className="mt-1 text-sm text-gray-500">Totals & delivery info.</p>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Items total</span>
            <span className="font-bold text-gray-900">{itemsTotal}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Shipping charge</span>
            <span className="font-bold text-gray-900">{order?.shipping_charge}</span>
          </div>

          <div className="my-3 h-px bg-gray-100" />

          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-extrabold">Order total</span>
            <span className="text-gray-900 font-extrabold">{order?.full_total}</span>
          </div>
        </div>

        <div className="my-6 h-px bg-gray-100" />

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-gray-800">Shipping status</span>
            <span className={shippingPillClass}>{order?.shipping || "—"}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-gray-800">Payment status</span>

            <div className="text-right flex items-center gap-2">
              <div className={paymentPillClass}>{order?.payment || "—"}</div>

              {order?.payment === "pending" && user_id && order?._id && (
                <Link
                  href={`/checkout/${user_id}/${order._id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow-md transition
                             bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] hover:opacity-95 active:scale-[0.99] text-nowrap"
                >
                  <AiOutlineLoading3Quarters className="hidden" />
                  Pay now
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
            <div className="text-xs font-semibold text-gray-600">Shipping address</div>
            <div className="mt-1 text-sm font-semibold text-gray-900 break-words">
              {order?.address || "—"}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          Thanks for your order 💖
        </div>
      </div>
    </div>
  );
}
