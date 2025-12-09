"use client";

import { useEffect, useState } from "react";
import { Trash2, Pencil, Search, Plus } from "lucide-react";
import Link from "next/link";

export default function ItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/items");
      const data = await res.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      console.log("Failed to load items", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    await fetch("/api/items", {
      method: "DELETE",
      body: JSON.stringify({ itemId: id }),
    });

    fetchItems();
  };

  // Filter logic
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📦 Inventory Items</h1>

        <Link
          href="/dashboard/items/new"
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <Plus size={18} /> Add Item
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-6">
        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        <input
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-orange-500"
          placeholder="Search items..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-gray-600 animate-pulse">Loading items...</p>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <p className="text-gray-600">No items found.</p>
      )}

      {/* Items Table */}
      {!loading && filtered.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl border">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Quantity</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.quantity}</td>

                  {/* ACTION BUTTONS */}
                  <td className="p-3 flex justify-center gap-3">
                    <Link
                      href={`/dashboard/items/${item._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={20} />
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between p-4 items-center">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded-md disabled:opacity-40"
            >
              Previous
            </button>

            <p className="text-gray-600">
              Page <strong>{page}</strong> of{" "}
              {Math.ceil(filtered.length / itemsPerPage)}
            </p>

            <button
              disabled={page >= filtered.length / itemsPerPage}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded-md disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
