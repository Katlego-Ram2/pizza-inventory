
import ItemTable from "@/components/ItemTable";
import Link from "next/link";

export default function ItemsPage() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Items</h1>
        <Link
          href="/dashboard/items/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Item
        </Link>
      </div>

      <ItemTable />
    </div>
  );
}
