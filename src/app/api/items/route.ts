import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../.././lib/mongodb";

// GET: List all items
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pizza_inventory");
    const items = await db.collection("items").find().toArray();
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// POST: Add new item
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("pizza_inventory");
    const data = await req.json();

    const item = {
      name: data.name,
      category: data.category,
      unit: data.unit,
      quantity: data.quantity,
      reorderThreshold: data.reorderThreshold,
      costPrice: data.costPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: data.createdBy || "admin",
    };

    const result = await db.collection("items").insertOne(item);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}

// PATCH: Adjust quantity
export async function PATCH(req: Request) {
  try {
    const { itemId, quantityDelta, user }: { itemId: string; quantityDelta: number; user: string } = await req.json();

    if (!itemId || typeof quantityDelta !== "number") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("pizza_inventory");
    const itemsColl = db.collection("items");
    const auditColl = db.collection("audit");

    const item = await itemsColl.findOne({ _id: new ObjectId(itemId) });
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    const newQuantity = item.quantity + quantityDelta;

    await itemsColl.updateOne(
      { _id: new ObjectId(itemId) },
      { $set: { quantity: newQuantity, updatedAt: new Date() } }
    );

    await auditColl.insertOne({
      itemId,
      user,
      delta: quantityDelta,
      newQuantity,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: "Quantity updated", newQuantity });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: Remove item
export async function DELETE(req: Request) {
  try {
    const { itemId }: { itemId: string } = await req.json();

    if (!itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("pizza_inventory");

    await db.collection("items").deleteOne({ _id: new ObjectId(itemId) });

    return NextResponse.json({ message: "Item deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
