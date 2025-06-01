"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminDashboard() {
  const [shopId, setShopId] = useState("");
  const router = useRouter();

  const handleNavigateToEdit = () => {
    if (shopId.trim()) {
      router.push(`/admin/edit-shop/${shopId}`);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <LinkCard title="Add New Shop" href="/admin/add-shop" />
        <LinkCard title="View All Shops" href="/admin/shop-list" />
        <LinkCard title="View All Users" href="/admin/user-list" />
      </div>

      
    </div>
  );
}

function LinkCard({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href}>
      <div className="border rounded-lg p-5 bg-white hover:bg-gray-100 shadow-sm transition">
        <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
        <p className="text-sm text-gray-600 break-words mt-1">{href}</p>
      </div>
    </Link>
  );
}
