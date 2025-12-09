
import clientPromise from "../../lib/mongodb";

export default async function CategoriesPage() {
  const client = await clientPromise;
  const db = client.db("pizza_inventory");

 
  const categories = await db.collection("categories").find().toArray();

  if (!categories || categories.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <p className="text-gray-500">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat: any) => (
            <tr key={cat._id.toString()} className="border-b">
              <td className="p-3 border">{cat.name}</td>
              <td className="p-3 border">{cat.description ?? "—"}</td>
              <td className="p-3 border">
                {cat.createdAt ? new Date(cat.createdAt).toLocaleString() : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
