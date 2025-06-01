// app/admin/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r p-6">
          <nav className="space-y-4">
            <NavItem href="/admin" label="Dashboard" />
            <NavItem href="/admin/shop-list" label="All Shops" />
            <NavItem href="/admin/add-shop" label="Add Shop" />
            <NavItem href="/admin/user-list" label="Users" />
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-gray-700 hover:text-blue-600 transition font-medium"
    >
      {label}
    </Link>
  );
}
