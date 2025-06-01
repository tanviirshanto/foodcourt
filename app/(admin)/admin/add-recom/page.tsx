"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface ShopItem {
  _id: string;
  name: string;
  shopName: string;
}

export default function RecommendedAdminPage() {
  const [recommended, setRecommended] = useState<any[]>([]);
  const [items, setItems] = useState<ShopItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState("");

  useEffect(() => {
    fetchRecommended();
    fetchAllShopItems();
  }, []);

  const fetchRecommended = async () => {
    const { data } = await axios.get("/api/admin/recommended");
    setRecommended(data);
  };

  const fetchAllShopItems = async () => {
    const { data } = await axios.get("/api/admin/shop-items-flat");
    setItems(data);
  };

  const handleAdd = async () => {
  try {
    await axios.post("/api/admin/recommended", { itemId: selectedItemId });
    fetchRecommended();
    setSelectedItemId(""); // Clear selection
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || "Error adding recommended";
    alert(errorMessage);
  }
};


  const handleDelete = async (id: string) => {
    await axios.delete("/api/admin/recommended", { data: { id } });
    fetchRecommended();
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Manage Recommended Items</h1>

      {recommended.length >= 6 && (
        <p className="text-red-500 text-center">Maximum of 6 items allowed.</p>
      )}

      <div className="grid gap-4">
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select item...</option>
          {items
  .filter((item) => !recommended.some((r) => r.name === item.name && r.shop_name === item.shopName))
  .map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} — ({item.shopName})
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          disabled={!selectedItemId || recommended.length >= 6}
          onClick={handleAdd}
        >
          Add to Recommended
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {recommended.map((item) => (
          <li key={item._id} className="border p-4 rounded flex justify-between">
            <span>{item.name}</span>
            <button onClick={() => handleDelete(item._id)} className="text-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
