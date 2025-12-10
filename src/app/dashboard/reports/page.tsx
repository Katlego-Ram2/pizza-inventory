import clientPromise from "../../lib/mongodb";

export default async function ReportsPage() {
  const client = await clientPromise;
  const db = client.db("pizza_inventory");

 
  const items = await db.collection("items").find().toArray();

 
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item: any) => sum + (item.quantity || 0), 0);

 
  const lowStockItems = items.filter(
    (item: any) => item.reorderThreshold != null && item.quantity <= item.reorderThreshold
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Reports</h1>

      {/* Summary */}
      <div className="mb-6 flex gap-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <p className="font-semibold">Total Items</p>
          <p className="text-lg">{totalItems}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <p className="font-semibold">Total Quantity</p>
          <p className="text-lg">{totalQuantity}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <p className="font-semibold">Low Stock Items</p>
          <p className="text-lg">{lowStockItems.length}</p>
        </div>
      </div>

      {/* Detailed Table */}
      {items.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Reorder Threshold</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item._id.toString()} className="border-b">
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">{item.category}</td>
                <td className="p-3 border">{item.quantity}</td>
                <td className="p-3 border">{item.reorderThreshold ?? "—"}</td>
                <td className={`p-3 border font-semibold ${item.quantity <= item.reorderThreshold ? 'text-red-600' : 'text-green-600'}`}>
                  {item.quantity <= item.reorderThreshold ? 'Low Stock' : 'OK'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No items found in inventory.</p>
      )}
    </div>
  );
}
