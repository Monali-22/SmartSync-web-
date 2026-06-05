import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIRecommendations, DataQualityMetrics } from "@/lib/types";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function generateAIRecommendations(
  metrics: DataQualityMetrics,
  recordCount: number
): Promise<AIRecommendations> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Based on these customer data quality metrics, provide specific, actionable recommendations:
    
    Total Records: ${metrics.totalRecords}
    Quality Score: ${metrics.qualityScore}%
    Completeness Score: ${metrics.completenessScore}%
    Duplicate Rate: ${metrics.duplicateRate}%
    Missing Fields: ${metrics.missingFields}
    Invalid Emails: ${metrics.invalidEmails}
    Invalid Phones: ${metrics.invalidPhones}
    
    Please provide a JSON response with the following structure (ONLY return valid JSON, no other text):
    {
      "qualityImprovements": ["improvement 1", "improvement 2", "improvement 3"],
      "dataCollectionSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
      "crmOptimizations": ["optimization 1", "optimization 2", "optimization 3"],
      "retentionOpportunities": ["opportunity 1", "opportunity 2", "opportunity 3"],
      "marketingReadinessAssessment": "A brief assessment of marketing readiness"
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const recommendations = JSON.parse(jsonMatch[0]) as AIRecommendations;
    return recommendations;
  } catch (error) {
    console.error("Error generating AI recommendations:", error);
    return {
      qualityImprovements: [
        "Standardize phone number formats",
        "Implement email validation rules",
        "Create data entry templates",
      ],
      dataCollectionSuggestions: [
        "Collect additional contact preferences",
        "Capture purchase history",
        "Maintain communication history",
      ],
      crmOptimizations: [
        "Set up automated deduplication",
        "Establish data governance policies",
        "Implement regular data audits",
      ],
      retentionOpportunities: [
        "Segment customers by engagement level",
        "Create personalized retention campaigns",
        "Establish VIP customer programs",
      ],
      marketingReadinessAssessment:
        "Your data is moderately ready for marketing. Focus on improving completeness scores.",
    };
  }
}

export async function generateDataCleaningSummary(
  qualityScore: number,
  completenessScore: number,
  duplicateRate: number
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Provide a professional 2-3 sentence executive summary of customer data quality:
    Quality Score: ${qualityScore}%
    Completeness Score: ${completenessScore}%
    Duplicate Rate: ${duplicateRate}%
    
    Keep it concise and business-focused.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    return `Your customer dataset has a quality score of ${qualityScore}% and completeness score of ${completenessScore}%. With ${duplicateRate}% duplicate rate, there is opportunity for improvement through data standardization and deduplication.`;
  }
}
