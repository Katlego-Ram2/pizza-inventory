"use client";

import { useEffect, useState } from "react";

export default function ItemTable() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched items:", data); 
        setItems(data); 
      })
      .catch((err) => console.error("Failed to fetch items", err));
  }, []);

  return (
    <table className="w-full bg-white shadow rounded-lg">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-3">Name</th>
          <th className="p-3">Category</th>
          <th className="p-3">Quantity</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={4} className="p-3 text-center text-gray-500">
              No items found
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">
                <a
                  href={`/dashboard/items/${item._id}`}
                  className="text-blue-600 underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
