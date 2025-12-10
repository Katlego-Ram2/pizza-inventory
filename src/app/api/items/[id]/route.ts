import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// ================= GET ITEM =================
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db("pizza_inventory");

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(params.id);
  } catch {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const item = await db.collection("items").findOne({ _id: objectId });
  if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  return NextResponse.json({ ...item, _id: item._id.toString() });
}

// ================= UPDATE ITEM =================
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db("pizza_inventory");

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(params.id);
  } catch {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  if (data._id) delete data._id;

  await db.collection("items").updateOne(
    { _id: objectId },
    { $set: { ...data, updatedAt: new Date() } }
  );

  return NextResponse.json({ message: "Item updated" });
}

// ================= DELETE ITEM =================
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db("pizza_inventory");

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(params.id);
  } catch {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.collection("items").deleteOne({ _id: objectId });

  return NextResponse.json({ message: "Item deleted" });
}
