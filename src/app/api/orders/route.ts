import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pizza_inventory");

    // Ensure collection exists
    const collections = await db.listCollections({ name: "orders" }).toArray();
    if (collections.length === 0) {
      await db.collection("orders").insertOne({
        orderNumber: "ORD-001",
        customerName: "katlego",
        items: [],
        totalAmount: 0,
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const orders = await db.collection("orders").find().sort({ createdAt: -1 }).toArray();

    const ordersFormatted = orders.map((o) => ({
      ...o,
      _id: o._id.toString(),
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    }));

    return NextResponse.json(ordersFormatted);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("pizza_inventory");

    const data = await req.json();

    if (!data.customerName || !data.items || !Array.isArray(data.items)) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const totalAmount = data.items.reduce(
      (sum: number, item: { quantity: number; unitPrice: number }) =>
        sum + item.quantity * item.unitPrice,
      0
    );

    const newOrder = {
      orderNumber: `ORD-${Date.now()}`, // simple unique order number
      customerName: data.customerName,
      items: data.items,
      totalAmount,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(newOrder);

    return NextResponse.json({
      ...newOrder,
      _id: result.insertedId.toString(),
      createdAt: newOrder.createdAt.toISOString(),
      updatedAt: newOrder.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
