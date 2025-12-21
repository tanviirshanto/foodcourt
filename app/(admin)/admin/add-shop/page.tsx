"use client";

import InputField from "@/components/Admin/AddShop/InputField";
import ShopItemForm from "@/components/Admin/AddShop/ShopItemForm";
import { useAddShopForm } from "@/hooks/Admin/AddShop/useAddShopForm";

export default function AddShopPage() {
  const { form, handleChange, handleAddItem } = useAddShopForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Add New Shop
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <InputField
                name="name"
                value={form.name}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Shop Name"
                required
                label="Shop Name"
              />

              <InputField
                name="image_url"
                value={form.image_url}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Image URL"
                required
                label="Shop Image URL"
              />
            </div>

            <h3 className="text-2xl font-semibold text-gray-700">Items</h3>
            {form.items.map((item, index) => (
              <ShopItemForm
                key={index}
                item={item}
                index={index}
                onChange={handleChange}
              />
            ))}

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={handleAddItem}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
              >
                Add Another Item
              </button>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition w-full sm:w-auto"
              >
                Submit Shop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
