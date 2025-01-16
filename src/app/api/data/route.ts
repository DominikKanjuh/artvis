import { loadAndProcessData } from "lib/data";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const data = await loadAndProcessData();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to load data", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to load data", details: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
