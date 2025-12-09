// src/app/dashboard/items/new/page.tsx
"use client";

import { useState } from "react";

export default function NewItem() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    category: "",
    quantity: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", category: "", quantity: "" };

    if (!form.name.trim()) {
      newErrors.name = "Item name is required";
      valid = false;
    }
    if (!form.category.trim()) {
      newErrors.category = "Category is required";
      valid = false;
    }
    if (form.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        window.location.href = "/dashboard/items";
      } else {
        alert("Failed to save item");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving item");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Item</h1>

      <div className="mb-4">
        <input
          className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <input
          className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      <div className="mb-6">
        <input
          type="number"
          className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.quantity ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Quantity"
          value={form.quantity || ""}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        />
        {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
      </div>

      <button
        onClick={submit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
        disabled={!form.name || !form.category || form.quantity <= 0}
      >
        Save Item
      </button>
    </div>
  );
}
