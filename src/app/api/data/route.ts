import { loadAndProcessData } from "lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await loadAndProcessData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading data:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
