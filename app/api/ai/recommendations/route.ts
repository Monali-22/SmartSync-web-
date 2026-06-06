import { NextRequest, NextResponse } from "next/server";
import { DataQualityMetrics, AIRecommendations } from "@/lib/types";
import { generateAIRecommendations } from "@/lib/ai/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metrics } = body as { metrics: DataQualityMetrics };

    if (!metrics) {
      return NextResponse.json(
        { error: "Missing metrics in request" },
        { status: 400 }
      );
    }
const recommendations = await generateAIRecommendations(metrics);
    );

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("AI recommendations error:", error);

    // Return fallback recommendations if Gemini API fails
    const fallbackRecommendations: AIRecommendations = {
      qualityImprovements: [
        "Implement data validation at entry points to catch errors early",
        "Create standardized formatting rules for all customer fields",
        "Establish duplicate detection workflows in your data pipeline",
      ],
      dataCollectionSuggestions: [
        "Collect customer preferences to improve segmentation",
        "Capture historical transaction data for better insights",
        "Maintain detailed communication logs for each customer",
      ],
      crmOptimizations: [
        "Set up automated duplicate detection and merging",
        "Create data quality scorecards for regular monitoring",
        "Implement role-based data governance policies",
      ],
      retentionOpportunities: [
        "Identify at-risk customers using engagement metrics",
        "Create personalized win-back campaigns for lapsed customers",
        "Implement loyalty reward programs for high-value customers",
      ],
      marketingReadinessAssessment:
        "Your customer data shows moderate marketing readiness. Focus on improving data completeness and removing duplicates to enable better targeted campaigns.",
    };

    return NextResponse.json(fallbackRecommendations);
  }
}
