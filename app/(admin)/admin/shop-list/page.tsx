"use client";

import Image from "next/image";
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
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Shop List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            {/* Shop Image */}
            <div className="relative">
              <Image
                src={shop.image_url}
                alt={shop.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
                aria-label={`Image of ${shop.name}`}
              />
            </div>

            {/* Shop Name */}
            <h2 className="text-2xl font-semibold text-gray-800">
              {shop.name}
            </h2>

            {/* Items Count */}
            <p className="text-gray-600 mt-2">{shop.items.length} items</p>

            {/* Link to Edit */}
            <div className="mt-4">
              <Link
                href={`/admin/edit-shop/${shop._id}`}
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                aria-label={`Edit ${shop.name}`}
              >
                Edit Shop
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
