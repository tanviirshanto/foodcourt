"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Item {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  estimated_time: number;
}

interface Shop {
  _id: string;
  name: string;
  image_url: string;
  items: Item[];
}

export default function ShopListPage() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const res = await fetch("/api/shop/getshops");
      const data = await res.json();
      if (data.success) setShops(data.shops);
      else alert("Error fetching shops");
    };
    fetchShops();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Shop List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop._id} className="bg-white p-4 rounded shadow-md">
            <img src={shop.image_url} alt={shop.name} className="h-40 w-full object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold">{shop.name}</h2>
            <p className="text-gray-600 mt-2">{shop.items.length} items</p>
            <Link
              href={`/admin/edit-shop/${shop._id}`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
