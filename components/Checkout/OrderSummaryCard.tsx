
"use client";

import Image from "next/image";
import React from "react";

export default function OrderSummaryCard({
  items,
  itemsTotal,
  shipping_charge,
  total,
  grandTotal,
  address,
}: {
  items: any[];
  itemsTotal: number;
  shipping_charge: number;
  total: any;
  grandTotal: number;
  address: string;
}) {
  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-extrabold text-gray-900">Order summary</h2>
        <p className="mt-1 text-sm text-gray-500">
          Review items, shipping and totals before paying.
        </p>
      </div>

      <ul className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
        {items.map((item: any) => {
          const qty = Number(item.quantity) || 0;
          const lineTotal = (Number(item.price) || 0) * qty;
          const lineTime = (Number(item.estimated_time) || 0) * qty;

          return (
            <li key={item._id} className="px-6 py-5">
              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <span className="absolute -top-2 -left-2 inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-white text-xs font-extrabold text-gray-700 ring-1 ring-gray-200 shadow">
                    x{qty}
                  </span>

                  <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl ring-1 ring-gray-100 bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={240}
                      height={240}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-base font-extrabold text-gray-900">
                        {item.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          Est. time: {lineTime} mins
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-base font-extrabold text-gray-900 whitespace-nowrap">
                        BDT. {lineTotal}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        BDT. {item.price} × {qty}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="px-6 py-6 border-t border-gray-100">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Items total</span>
            <span className="font-extrabold text-gray-900">BDT. {itemsTotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Shipping charge</span>
            <span className="font-extrabold text-gray-900">BDT. {shipping_charge}</span>
          </div>
          <div className="h-px bg-gray-100 my-3" />
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-extrabold">Total amount</span>
            <span className="text-gray-900 font-extrabold">
              BDT. {total ?? grandTotal}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-gray-100 bg-white px-4 py-3">
          <div className="text-xs font-semibold text-gray-600">
            Shipping address
          </div>
          <div className="mt-1 text-sm font-semibold text-gray-900 break-words">
            {address}
          </div>
        </div>
      </div>
    </div>
  );
}
