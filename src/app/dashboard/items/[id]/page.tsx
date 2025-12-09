
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

interface ItemPageProps {
  params: Promise<{ id: string }>; 
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params; 

  const client = await clientPromise;
  const db = client.db("pizza_inventory");
  const item = await db.collection("items").findOne({ _id: new ObjectId(id) });

  if (!item) {
    return <div className="p-6">Item not found</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Item Details</h1>
      <ul className="space-y-2">
        <li><strong>ID:</strong> {item._id.toString()}</li>
        <li><strong>Name:</strong> {item.name}</li>
        <li><strong>Category:</strong> {item.category}</li>
        <li><strong>Unit:</strong> {item.unit ?? "—"}</li>
        <li><strong>Quantity:</strong> {item.quantity}</li>
        <li><strong>Reorder Threshold:</strong> {item.reorderThreshold ?? "—"}</li>
        <li><strong>Cost Price:</strong> {item.costPrice ?? "—"}</li>
        <li><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</li>
        <li><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}</li>
        <li><strong>Created By:</strong> {item.createdBy}</li>
      </ul>
    </div>
  );
}
