"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus, FaEye, FaUsers } from "react-icons/fa"; // Icons for the dashboard cards

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

      {/* Search or Add Shop Section */}
      <div className="flex space-x-4 mb-8">
        <input
          type="text"
          placeholder="Enter Shop ID to edit"
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-64"
        />
        <button
          onClick={handleNavigateToEdit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-all"
        >
          Go to Shop
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <LinkCard
          title="Add New Shop"
          href="/admin/add-shop"
          icon={<FaPlus />}
          description="Add a new shop to the platform."
        />
        <LinkCard
          title="View All Shops"
          href="/admin/shop-list"
          icon={<FaEye />}
          description="Manage all the shops on the platform."
        />
        <LinkCard
          title="Manage Users"
          href="/admin/user-list"
          icon={<FaUsers />}
          description="View and manage users' details."
        />
      </div>
    </div>
  );
}

function LinkCard({
  title,
  href,
  icon,
  description,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-3xl text-blue-600">{icon}</div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
