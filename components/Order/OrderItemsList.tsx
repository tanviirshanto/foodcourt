"use client";

import Image from "next/image";

export default function OrderItemsList({ items }: { items: any[] }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-extrabold text-gray-900">Ordered items</h2>
        <p className="text-sm text-gray-500 mt-1">
          Quantity, category, estimated time, and line total.
        </p>
      </div>

      <ul className="divide-y divide-gray-100">
        {items.map((item: any) => {
          const qty = Number(item.quantity) || 0;
          const lineTotal = (Number(item.price) || 0) * qty;
          const lineTime = (Number(item.estimated_time) || 0) * qty;

          return (
            <li key={item._id} className="px-6 py-5">
              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <span className="absolute -top-2 -left-2 inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-white text-xs font-bold text-gray-700 ring-1 ring-gray-200 shadow">
                    {qty}
                  </span>

                  <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl ring-1 ring-gray-100 bg-gray-50">
                    <Image
                      className="h-full w-full object-cover"
                      src={item.image}
                      alt={item.name || "item"}
                      height={300}
                      width={300}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-base font-extrabold text-gray-900">{item.name}</p>

                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          Est. time: {lineTime}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-base font-extrabold text-gray-900">{lineTotal}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.price} × {qty}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
