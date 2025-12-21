import { useState, useEffect } from "react";

export const useEditShopForm = (shopId: string) => {
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/shop/getshop/${shopId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data.shop);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false); // Stop loading on error
        setForm(null);
      });
  }, [shopId]);

  if (loading) {
    return { form: null, loading: true };
  }

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

  return { form, handleChange, handleItemImagesChange, handleDeleteItem, handleAddItem, handleSubmit };
};
