"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params; // 👈 FIXED: no Promise, no use()

  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "",
    quantity: "",
    reorderThreshold: "",
    costPrice: "",
    createdBy: "",
  });

  const [loading, setLoading] = useState(true);

  // Load item on mount
  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        const data = await res.json();

        // 👇 THIS WILL NOW WORK
        setForm({
          name: data.name ?? "",
          category: data.category ?? "",
          unit: data.unit ?? "",
          quantity: data.quantity?.toString() ?? "",
          reorderThreshold: data.reorderThreshold?.toString() ?? "",
          costPrice: data.costPrice?.toString() ?? "",
          createdBy: data.createdBy ?? "",
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    loadItem();
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    await fetch(`/api/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    router.push("/dashboard/items");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this item?")) return;

    await fetch(`/api/items/${id}`, { method: "DELETE" });

    router.push("/dashboard/items");
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input className="w-full border p-2 rounded" name="name" value={form.name} onChange={handleChange} />
        <input className="w-full border p-2 rounded" name="category" value={form.category} onChange={handleChange} />
        <input className="w-full border p-2 rounded" name="unit" value={form.unit} onChange={handleChange} />
        <input className="w-full border p-2 rounded" name="quantity" value={form.quantity} onChange={handleChange} />
        <input className="w-full border p-2 rounded" name="reorderThreshold" value={form.reorderThreshold} onChange={handleChange} />
        <input className="w-full border p-2 rounded" name="costPrice" value={form.costPrice} onChange={handleChange} />
        <input className="w-full border p-2 rounded" name="createdBy" value={form.createdBy} onChange={handleChange} />

        <div className="flex gap-4 mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
          <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete Item</button>
        </div>
      </form>
    </div>
  );
}
