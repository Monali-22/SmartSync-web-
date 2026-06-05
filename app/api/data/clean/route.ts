import { NextRequest, NextResponse } from "next/server";
import { CustomerRecord, CleanedDataResult } from "@/lib/types";
import {
  cleanDataset,
  detectDuplicates,
  identifyIssues,
  calculateQualityMetrics,
} from "@/lib/utils/data-validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { records } = body as { records: CustomerRecord[] };

    if (!Array.isArray(records) || records.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty records array" },
        { status: 400 }
      );
    }

    const { cleaned, issues, duplicates, metrics } = cleanDataset(records);

    const mergedRecords = duplicates.map((group, index) => {
      const records = cleaned.filter((r) => group.includes(r.id));
      const mergedRecord = {
        id: `merged-${index}`,
        mergedIds: group,
        firstName: records[0]?.firstName || "",
        lastName: records[0]?.lastName || "",
        email: records[0]?.email || "",
        phone: records[0]?.phone || "",
        company: records[0]?.company || "",
        address: records[0]?.address || "",
        city: records[0]?.city || "",
        state: records[0]?.state || "",
        zipCode: records[0]?.zipCode || "",
        country: records[0]?.country || "",
        confidence: 0.95,
        mergedAt: new Date().toISOString(),
      };
      return mergedRecord;
    });

    const result: CleanedDataResult = {
      originalRecords: records,
      cleanedRecords: cleaned,
      mergedRecords,
      issues,
      metrics,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Data cleaning error:", error);
    return NextResponse.json(
      { error: "Failed to process data" },
      { status: 500 }
    );
  }
}
