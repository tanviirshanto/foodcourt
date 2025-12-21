"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import axios from "axios";

import { useCheckout } from "@/hooks/Checkout/useCheckout";
import PageShell from "@/components/Common/PageShell";
import CheckoutLoaderCard from "@/components/Checkout/CheckoutLoaderCard";
import CheckoutTopBar from "@/components/Checkout/CheckoutTopBar";
import OrderSummaryCard from "@/components/Checkout/OrderSummaryCard";
import PaymentCard from "@/components/Checkout/PaymentCard";
import StatusPill from "@/components/Checkout/StatusPill";

export default function CheckoutPage() {
  const params = useParams() as any;
  const userId = params.userId as string | undefined;
  const orderid = params.orderid as string | undefined;

  const { order, userInfo, fetchError } = useCheckout(userId, orderid);

  const [stripeLoading, setStripeLoading] = useState(false);
  const [sslLoading, setSslLoading] = useState(false);

  const shipping_charge = order?.shipping_charge ?? 120;
  const items = useMemo(() => order?.items ?? [], [order?.items]);

  const itemsTotal = useMemo(() => {
    return items.reduce(
      (sum: number, item: any) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    );
  }, [items]);

  const grandTotal = useMemo(() => {
    return itemsTotal + (Number(shipping_charge) || 0);
  }, [itemsTotal, shipping_charge]);

  const payment = (order?.payment || "").toString().toLowerCase();
  const shipping = (order?.shipping || "").toString().toLowerCase();

  const handlePaymentWithStripe = async () => {
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
  };

  const handlePaymentWithSSLCommerz = async () => {
    if (!userInfo) return;

    try {
      setSslLoading(true);

      const response = await axios.post("/api/payment/sslcommerz/initiate", {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.contact,
        address: userInfo.address,
        items: order.items,
        amount: grandTotal,
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
  };

  if (!order || !userInfo) {
    return (
      <PageShell className="flex items-center justify-center px-6">
        <CheckoutLoaderCard fetchError={fetchError} />
      </PageShell>
    );
  }

  return (
    <PageShell className="pt-[96px]">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <CheckoutTopBar
          orderid={orderid}
          itemsLength={items.length}
          paymentPill={
            <StatusPill
              tone={
                payment === "paid" || payment === "success"
                  ? "green"
                  : payment === "pending"
                  ? "yellow"
                  : "red"
              }
              label={order.payment}
            />
          }
          shippingPill={
            <StatusPill
              tone={
                shipping.includes("delivered") || shipping.includes("complete")
                  ? "green"
                  : shipping.includes("pending") ||
                    shipping.includes("processing")
                  ? "yellow"
                  : "gray"
              }
              label={order.shipping}
            />
          }
          payment={order.payment}
          shipping={order.shipping}
        />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <OrderSummaryCard
              items={items}
              itemsTotal={itemsTotal}
              shipping_charge={shipping_charge}
              total={order.full_total}
              grandTotal={grandTotal}
              address={order.address}
            />
          </div>

          <div className="lg:col-span-5">
            <PaymentCard
              total={order.full_total}
              grandTotal={grandTotal}
              stripeLoading={stripeLoading}
              sslLoading={sslLoading}
              onStripe={handlePaymentWithStripe}
              onSSL={handlePaymentWithSSLCommerz}
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
