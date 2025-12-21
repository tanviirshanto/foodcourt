"use client";

import React from "react";
import OrderDetailsHeader from "@/components/Order/OrderDetailsHeader";
import OrderLoadingState from "@/components/Order/OrderLoadingState";
import OrderErrorState from "@/components/Order/OrderErrorState";
import OrderItemsList from "@/components/Order/OrderItemsList";
import OrderSummaryCard from "@/components/Order/OrderSummaryCard";
import { useOrderDetails } from "@/hooks/Order/useOrderDetails";
import { useOrderMetrics } from "@/hooks/Order/useOrderMetrics";

function Page({ params }: any) {
  const orderId = params?.order_id;

  const { status, user_id, order, loadingOrder, fetchError } =
    useOrderDetails(orderId);

  const items = order?.items || [];
  const { itemsTotal, estTotalTime } = useOrderMetrics(items);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#fff1f2] via-white to-white">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ff7b5c]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#ff3f72]/25 blur-3xl" />
      </div>

      <div className="mt-[80px] relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <OrderDetailsHeader
          orderId={orderId}
          itemsCount={items.length}
          estTotalTime={estTotalTime || 0}
        />

        <div className="mt-6">
          {(status === "loading" || loadingOrder) && <OrderLoadingState />}
          {!!fetchError && <OrderErrorState message={fetchError} />}
        </div>

        {!!order && !loadingOrder && !fetchError && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <OrderItemsList items={items} />
            </div>

            <div className="lg:col-span-4">
              <OrderSummaryCard
                order={order}
                user_id={user_id}
                itemsTotal={itemsTotal}
              />
            </div>
          </div>
        )}
      </div>

      <div className="h-10" />
    </div>
  );
}

export default Page;
