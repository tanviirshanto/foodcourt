"use client";

import { SingleOrder } from "@/types/order";
import { useEffect, useState } from "react";
import uniqid from 'uniqid';

interface Order {
  _id: string;
  user_id: string;
  orders: SingleOrder[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 5;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/orders?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">All Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="bg-white rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-2">User ID: {order.user_id}</h3>
          {order.orders.map((o) => (
            <div key={uniqid()} className="border rounded mb-4 p-4">
              <p><strong>Date:</strong> {new Date(o.order_date).toLocaleString()}</p>
              <p><strong>Name:</strong> {o.name}</p>
              <p><strong>Email:</strong> {o.email}</p>
              <p><strong>Contact:</strong> {o.contact}</p>
              <p><strong>Address:</strong> {o.address}</p>
              <p><strong>Shipping:</strong> {o.shipping}</p>
              <p><strong>Payment:</strong> {o.payment}</p>
              <p><strong>Total:</strong> BDT {o.full_total}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Items:</h4>
                {o.items.map((item) => (
                  <div key={item.id} className="ml-4 text-sm">
                    • {item.name} x {item.quantity} = ₹{item.price * item.quantity}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
