"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Item {
  _id: string;
  name: string;
  category: string;
  unit?: string;
  quantity: number;
  reorderThreshold?: number;
  costPrice?: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface ItemEditorProps {
  id: string;
}

export default function ItemEditor({ id }: ItemEditorProps) {
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "",
    quantity: 0,
    reorderThreshold: 0,
    costPrice: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch item
  const fetchItem = async () => {
    setLoading(true);
    const res = await fetch(`/api/items/${id}`);
    if (!res.ok) {
      alert("Failed to load item");
      setLoading(false);
      return;
    }
    const data: Item = await res.json();
    setItem(data);
    setForm({
      name: data.name,
      category: data.category,
      unit: data.unit || "",
      quantity: data.quantity,
      reorderThreshold: data.reorderThreshold || 0,
      costPrice: data.costPrice || 0,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!item) return <div className="p-6">Item not found</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["quantity", "reorderThreshold", "costPrice"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Item updated successfully!");
      await fetchItem(); // Refresh item and updatedAt
    } else {
      alert("Failed to update item.");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setDeleting(true);
    const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Item deleted successfully!");
      router.push("/dashboard/items");
    } else {
      alert("Failed to delete item.");
    }
    setDeleting(false);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Item</h1>

      <div className="grid grid-cols-1 gap-4">
        {["name", "category", "unit"].map((field) => (
          <label className="flex flex-col" key={field}>
            <span className="font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
            <input
              type="text"
              name={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-orange-500"
            />
          </label>
        ))}

        {["quantity", "reorderThreshold", "costPrice"].map((field) => (
          <label className="flex flex-col" key={field}>
            <span className="font-medium">{field}</span>
            <input
              type="number"
              name={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-orange-500"
            />
          </label>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Created By: {item.createdBy} | Created At: {new Date(item.createdAt).toLocaleString()} | Updated At: {new Date(item.updatedAt).toLocaleString()}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() => router.push("/dashboard/items")}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          Back to List
        </button>
      </div>
    </div>
  );
}
