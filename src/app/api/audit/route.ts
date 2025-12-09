import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

// GET: Audit trail
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pizza_inventory");
    const audit = await db.collection("audit").find().sort({ timestamp: -1 }).toArray();
    return NextResponse.json(audit);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}
