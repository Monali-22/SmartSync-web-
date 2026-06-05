import { NextRequest, NextResponse } from "next/server";
import { generateDemoDataset } from "@/lib/data/demo-dataset";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const count = parseInt(searchParams.get("count") || "500", 10);

    const records = generateDemoDataset(Math.min(count, 1000));

    return NextResponse.json({
      records,
      message: "Demo dataset generated successfully",
      count: records.length,
    });
  } catch (error) {
    console.error("Demo data generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate demo data" },
      { status: 500 }
    );
  }
}
