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

interface EditOrderPageProps {
  params: { id: string };
}

export default function EditOrderPage({ params }: EditOrderPageProps) {
  const { id } = params;
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const loadOrder = async () => {
      const res = await fetch(`/api/orders/${id}`);
      const data: Order = await res.json();
      setOrder(data);
      setLoading(false);
    };
    loadOrder();
  }, [id]);

 
  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    if (!order) return;

    const updatedItems = [...order.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setOrder({ ...order, items: updatedItems });
  };


  const addItem = () => {
    if (!order) return;
    setOrder({
      ...order,
      items: [...order.items, { name: "", quantity: 1, unitPrice: 0 }],
    });
  };


  const removeItem = (index: number) => {
    if (!order) return;
    setOrder({
      ...order,
      items: order.items.filter((_, i) => i !== index),
    });
  };

 
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    router.push("/dashboard/orders");
  };

  
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    router.push("/dashboard/orders");
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!order) return <div className="p-6">Order not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded space-y-4">
      <h1 className="text-2xl font-bold">Edit Order: {order.orderNumber}</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
   
        <div>
          <label className="font-semibold">Customer Name</label>
          <input
            type="text"
            value={order.customerName}
            onChange={(e) =>
              setOrder({ ...order, customerName: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Items */}
        <div className="space-y-2">
          <h2 className="font-semibold">Items</h2>
          {order.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-2 items-end">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(idx, "name", e.target.value)
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(idx, "quantity", Number(e.target.value))
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label>Unit Price</label>
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(idx, "unitPrice", Number(e.target.value))
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            Add Item
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Order
          </button>
        </div>
      </form>
    </div>
  );
}
