
"use client";

import { useState } from "react";

export default function NewItem() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: 0,
  });

  const submit = async () => {
    await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify(form),
    });
    window.location.href = "/dashboard/items";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Item Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        type="number"
        className="w-full border p-2 mb-3"
        placeholder="Quantity"
        onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
      />

      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Save
      </button>
    </div>
  );
}
