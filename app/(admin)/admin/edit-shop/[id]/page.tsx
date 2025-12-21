"use client";

import InputField from "@/components/Admin/EditShop/InputField";
import ItemForm from "@/components/Admin/EditShop/ItemForm";
import { useEditShopForm } from "@/hooks/Admin/EditShop/useEditShopForm";

export default function EditShopForm({ params }: { params: { id: string } }) {
  const {
    form,
    handleChange,
    handleItemImagesChange,
    handleDeleteItem,
    handleAddItem,
    handleSubmit,
  } = useEditShopForm(params.id);

  // Ensure form is not null before rendering the form
  if (form === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Edit Shop
        </h2>

        <div className="space-y-6">
          <InputField
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter shop name"
            required
          />
          <InputField
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Items</h3>
          {form.items.map((item, index) => (
            <ItemForm
              key={index}
              item={item}
              index={index}
              onChange={handleChange}
              onDelete={handleDeleteItem}
              onImagesChange={handleItemImagesChange}
            />
          ))}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none transition-all"
            >
              + Add Item
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-all w-full sm:w-auto"
            >
              Update Shop
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
