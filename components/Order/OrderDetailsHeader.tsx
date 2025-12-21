"use client";

export default function OrderDetailsHeader({
  orderId,
  itemsCount,
  estTotalTime,
}: {
  orderId: string;
  itemsCount: number;
  estTotalTime: number;
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white/70 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Order details
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review items, totals, and payment/shipping status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Order ID: {orderId}
          </span>
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
            Items: {itemsCount}
          </span>
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
            Est. time: {estTotalTime || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
