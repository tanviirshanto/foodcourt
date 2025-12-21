import { useState } from "react";

export const useAddShopForm = () => {
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

  return {
    form,
    handleChange,
    handleAddItem,
  };
};
