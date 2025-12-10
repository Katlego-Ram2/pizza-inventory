"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    fetchOrders();
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/orders/${id}`);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <button
        onClick={() => router.push("/dashboard/orders/new")}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New Order
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Order #</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Items</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Created At</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-3 border">{order.orderNumber}</td>
                <td className="p-3 border">{order.customerName}</td>
                <td className="p-3 border">
                  {order.items.map((i) => `${i.name} (${i.quantity})`).join(", ")}
                </td>
                <td className="p-3 border">${order.totalAmount.toFixed(2)}</td>
                <td className="p-3 border">{order.status}</td>
                <td className="p-3 border">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="p-3 border flex gap-2">
                  <button
                    onClick={() => handleEdit(order._id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
