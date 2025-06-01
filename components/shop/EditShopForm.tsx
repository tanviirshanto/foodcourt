"use client";

import { useState, useEffect } from "react";

export default function EditShopForm({ shopId }: { shopId: string }) {
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/shop/getshop/${shopId}`)
      .then(res => res.json())
      .then(data => setForm(data.shop));
  }, [shopId]);

  if (!form) return <p>Loading...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number, field?: string) => {
    if (index !== undefined && field) {
      const updatedItems = [...form.items];
      updatedItems[index][field] =
        field === "price" || field === "estimated_time"
          ? parseInt(e.target.value)
          : e.target.value;
      setForm({ ...form, items: updatedItems });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleItemImagesChange = (value: string, index: number) => {
    const updated = [...form.items];
    updated[index].images = value.split(",");
    setForm({ ...form, items: updated });
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updatedItems });
  };

  const handleAddItem = () => {
    const newItem = {
      name: "",
      category: "",
      price: 0,
      description: "",
      images: [],
      estimated_time: 0,
    };
    setForm({ ...form, items: [...form.items, newItem] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/shop/editshop/${shopId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      alert("Shop updated successfully!");
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Shop</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Shop Name"
      />
      <input
        name="image_url"
        value={form.image_url}
        onChange={handleChange}
        className="w-full mb-6 p-2 border rounded"
        placeholder="Shop Image URL"
      />

      <h3 className="text-xl font-semibold mb-2">Items</h3>
      {form.items.map((item: any, index: number) => (
        <div key={index} className="mb-6 border p-4 rounded bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-medium">Item {index + 1}</h4>
            <button
              type="button"
              onClick={() => handleDeleteItem(index)}
              className="text-red-600 hover:underline"
            >
              Delete Item
            </button>
          </div>

          <input
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleChange(e, index, "name")}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            placeholder="Category"
            value={item.category}
            onChange={(e) => handleChange(e, index, "category")}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleChange(e, index, "price")}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleChange(e, index, "description")}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            placeholder="Image URLs (comma-separated)"
            value={item.images.join(",")}
            onChange={(e) => handleItemImagesChange(e.target.value, index)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Estimated Time"
            value={item.estimated_time}
            onChange={(e) => handleChange(e, index, "estimated_time")}
            className="w-full mb-2 p-2 border rounded"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddItem}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      >
        + Add Item
      </button>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 block w-full"
      >
        Update Shop
      </button>
    </form>
  );
}
