// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Items", path: "/dashboard/items" },
  { name: "Categories", path: "/dashboard/categories" },
  { name: "Orders", path: "/dashboard/orders" },
  { name: "Reports", path: "/dashboard/reports" },
  { name: "Settings", path: "/dashboard/settings" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <div className="w-64 bg-white shadow-md p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">🍕 Pizza Admin</h2>

      {menu.map((m) => (
        <Link
          key={m.path}
          href={m.path}
          className={`block px-4 py-2 rounded-lg mb-2 ${
            path === m.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {m.name}
        </Link>
      ))}
    </div>
  );
}
