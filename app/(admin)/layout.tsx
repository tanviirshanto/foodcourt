"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { FaTachometerAlt, FaStore, FaUsers } from "react-icons/fa"; // Icons for the sidebar

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-4 shadow-lg">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r p-6 shadow-lg">
          <nav className="space-y-6">
            <NavItem href="/admin" label="Dashboard" icon={<FaTachometerAlt />} />
            <NavItem href="/admin/order-list" label="Orders" icon={<FaStore />} />
            <NavItem href="/admin/shop-list" label="All Shops" icon={<FaStore />} />
            <NavItem href="/admin/add-shop" label="Add Shop" icon={<FaStore />} />
            <NavItem href="/admin/user-list" label="Users" icon={<FaUsers />} />
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition font-medium"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
