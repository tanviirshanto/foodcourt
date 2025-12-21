"use client";

import { SingleOrder } from "@/types/order";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  user_id: string;
  orders: SingleOrder[];
}

import OrderCard from "@/components/Admin/Order/OrderCard";
import PaginationControls from "@/components/Admin/Order/PaginationControls";

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        All Orders
      </h2>

      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
