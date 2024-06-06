// webhooks/route.ts
import Order from "@/models/orderModel";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const payload = await request.json();
    const eventType = payload.type;
    console.log("payload",payload)

  try {
    switch (eventType) {
      case "checkout.session.completed":
        const orderId = payload.data.object.metadata.orderid;
        const userId = payload.data.object.metadata.userId;

        // Find the order by user_id
        let order = await Order.findOne({ user_id: userId });

        if (!order) {
          console.error("Order not found");
          throw new Error("Order not found");
        }

        // Find the index of the order with the specified orderId
        const index = order.orders.findIndex(
          (item) => item._id.toString() === orderId
        );

        if (index === -1) {
          console.error("Order not found in the user's orders");
          throw new Error("Order not found in the user's orders");
        }

        // Update payment status
        order.orders[index].payment = "paid";

        // Save the updated order
        await order.save();

        break;
      case "checkout.session.async_payment_failed":
      case "checkout.session.async_payment_succeeded":
        // Handle async payment events if needed
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.error("Error handling webhook event", error);
    throw error;
  }

  return NextResponse.json("Webhook received");
};

