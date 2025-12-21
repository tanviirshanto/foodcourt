import { SingleOrder } from "@/types/order";
import uniqid from "uniqid";
import { useState } from "react";

interface Order {
  _id: string;
  user_id: string;
  orders: SingleOrder[];
}

const OrderCard = ({ order }: { order: Order }) => {
  const [status, setStatus] = useState<string>("Pending"); // Default status is "Pending"

  const handleStatusChange = () => {
    const statuses = ["Pending", "Shipped", "Delivered"];
    const nextStatus =
      statuses[(statuses.indexOf(status) + 1) % statuses.length];
    setStatus(nextStatus);
    // Optionally, make an API call to update the status in the backend
    fetch(`/api/admin/update-order-status/${order._id}`, {
      method: "PUT",
      body: JSON.stringify({ status: nextStatus }),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        User ID: {order.user_id}
      </h3>

      {/* Status Button */}
      <button
        onClick={handleStatusChange}
        className={`px-4 py-2 rounded-full mb-4 transition-colors ${
          status === "Pending"
            ? "bg-yellow-400 text-white hover:bg-yellow-500"
            : status === "Shipped"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
        aria-label={`Change status to ${
          status === "Pending"
            ? "Shipped"
            : status === "Shipped"
            ? "Delivered"
            : "Pending"
        }`}
      >
        {status}
      </button>

      {order.orders.map((o) => (
        <div key={uniqid()} className="border-t border-gray-200 mt-4 pt-4">
          <p>
            <strong>Date:</strong> {new Date(o.order_date).toLocaleString()}
          </p>
          <p>
            <strong>Name:</strong> {o.name}
          </p>
          <p>
            <strong>Email:</strong> {o.email}
          </p>
          <p>
            <strong>Contact:</strong> {o.contact}
          </p>
          <p>
            <strong>Address:</strong> {o.address}
          </p>
          <p>
            <strong>Shipping:</strong> {o.shipping}
          </p>
          <p>
            <strong>Payment:</strong> {o.payment}
          </p>
          <p>
            <strong>Total:</strong> BDT {o.full_total}
          </p>
          <div className="mt-2">
            <h4 className="font-semibold text-gray-700">Items:</h4>
            {o.items.map((item) => (
              <div key={item.id} className="ml-4 text-sm text-gray-600">
                • {item.name} x {item.quantity} = ₹{item.price * item.quantity}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
