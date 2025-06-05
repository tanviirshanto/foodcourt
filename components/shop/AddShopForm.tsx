// components/AddShopForm.tsx
"use client";

import { useState } from "react";

export default function AddShopForm() {
  const [form, setForm] = useState({
    name: "",
    image_url: "",
    items: [
      {
        name: "",
        category: "",
        price: 0,
        description: "",
        images: [""],
        estimated_time: 0,
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number, field?: string) => {
    if (index !== undefined && field) {
      const items = [...form.items];
      items[index][field] = e.target.value;
      setForm({ ...form, items });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        {
          name: "",
          category: "",
          price: 0,
          description: "",
          images: [""],
          estimated_time: 0,
        },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Submitting form:", form);

    const res = await fetch("/api/shop/addshop", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      alert("Shop added successfully!");
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add Shop</h2>

      <input
        name="name"
        placeholder="Shop Name"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        name="image_url"
        placeholder="Image URL"
        value={form.image_url}
        onChange={handleChange}
        className="w-full mb-6 p-2 border rounded"
        required
      />

      <h3 className="text-xl font-semibold mb-2">Items</h3>
      {form.items.map((item, index) => (
        <div key={index} className="mb-6 border p-4 rounded bg-gray-50">
          <input
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleChange(e, index, "name")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            placeholder="Category"
            value={item.category}
            onChange={(e) => handleChange(e, index, "category")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleChange(e, index, "price")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleChange(e, index, "description")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            placeholder="Image URL (comma-separated)"
            value={item.images.join(",")}
            onChange={(e) =>
              setForm((prev) => {
                const updated = [...prev.items];
                updated[index].images = e.target.value.split(",");
                return { ...prev, items: updated };
              })
            }
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Estimated Time (min)"
            value={item.estimated_time}
            onChange={(e) => handleChange(e, index, "estimated_time")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddItem}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Another Item
      </button>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 mt-4 rounded hover:bg-green-700 block w-full"
      >
        Submit Shop
      </button>
    </form>
  );
}
