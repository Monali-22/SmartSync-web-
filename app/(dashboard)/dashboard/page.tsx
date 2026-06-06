"use client";

import React, { useState, useCallback } from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { FileUpload } from "@/components/dashboard/file-upload";
import { MetricsGrid, DetailedMetrics } from "@/components/dashboard/metrics-grid";
import {
  QualityChart,
  DuplicateDistributionChart,
  CustomerSegmentationChart,
  MissingFieldsChart,
} from "@/components/dashboard/charts";
import { AIRecommendationsPanel } from "@/components/dashboard/ai-recommendations";
import { CleanedDataPreview, DataIssueList } from "@/components/dashboard/data-preview";
import { ExportOptions } from "@/components/dashboard/export-options";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CleanedDataResult,
  AIRecommendations,
  CustomerRecord,
} from "@/lib/types";
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Upload,
} from "lucide-react";

export default function DashboardPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleanedData, setCleanedData] = useState<CleanedDataResult | null>(null);
  const [recommendations, setRecommendations] =
    useState<AIRecommendations | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<string>("");

  const handleFileSelect = useCallback(async (file: File) => {
    setUploadedFile(file);
    setError(null);
    setCleanedData(null);
    setRecommendations(null);
  }, []);

  const processData = useCallback(async () => {
    if (!uploadedFile) {
      setError("Please select a file first");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      setProcessingStep("Parsing CSV file...");

      const text = await uploadedFile.text();
      const lines = text.split("\n");
      const records: CustomerRecord[] = [];

      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(",").map((v) => v.trim());
          const record: CustomerRecord = {
            id: `record-${i}`,
            firstName: values[0] || "",
            lastName: values[1] || "",
            email: values[2] || "",
            phone: values[3] || "",
            company: values[4] || "",
            address: values[5] || "",
            city: values[6] || "",
            state: values[7] || "",
            zipCode: values[8] || "",
            country: values[9] || "",
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            source: "CSV Upload",
          };
          records.push(record);
        }
      }

      setProcessingStep("Cleaning and validating data...");

      const response = await fetch("/api/data/clean", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ records }),
      });

      if (!response.ok) {
        throw new Error("Failed to process data");
      }

      const result: CleanedDataResult = await response.json();
      setCleanedData(result);

      setProcessingStep("Generating AI recommendations...");

      const recResponse = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics: result.metrics }),
      });

      if (recResponse.ok) {
        const recs: AIRecommendations = await recResponse.json();
        setRecommendations(recs);
      }

      setProcessingStep("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while processing"
      );
      setProcessingStep("");
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFile]);

  const useDemoData = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    setProcessingStep("Generating demo dataset...");

    try {
      const response = await fetch("/api/data/demo", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to load demo data");
      }

      const data = await response.json();

      setProcessingStep("Cleaning demo data...");

      const cleanResponse = await fetch("/api/data/clean", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ records: data.records }),
      });

      if (!cleanResponse.ok) {
        throw new Error("Failed to process demo data");
      }

      const result: CleanedDataResult = await cleanResponse.json();
      setCleanedData(result);

      setProcessingStep("Generating AI recommendations...");

      const recResponse = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics: result.metrics }),
      });

      if (recResponse.ok) {
        const recs: AIRecommendations = await recResponse.json();
        setRecommendations(recs);
      }

      setProcessingStep("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while loading demo data"
      );
      setProcessingStep("");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
            Data Cleaning Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your customer data and let AI clean it for you
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Processing Status */}
        {isProcessing && (
          <Card className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <LoadingSpinner size="md" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Processing your data...
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {processingStep}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column - Input & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload
              onFileSelect={handleFileSelect}
              isLoading={isProcessing}
            />

            <div className="space-y-3">
              <Button
                onClick={processData}
                disabled={!uploadedFile || isProcessing}
                className="w-full group"
                size="lg"
              >
                <Upload className="mr-2 h-4 w-4" />
                Process File
              </Button>

              <Button
                onClick={useDemoData}
                disabled={isProcessing}
                variant="secondary"
                className="w-full"
                size="lg"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Try Demo Data
              </Button>
            </div>

            {/* Quick Stats */}
            {cleanedData && (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Records Processed
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {cleanedData.metrics.totalRecords}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quality Score
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                        <div
                          className="h-full bg-blue-600"
                          style={{
                            width: `${cleanedData.metrics.qualityScore}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {cleanedData.metrics.qualityScore}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Results & Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {!cleanedData ? (
              <Card className="text-center py-12">
                <CardContent>
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No data to display
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload a CSV file or use sample data to get started
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Success Alert */}
                <Alert variant="success" className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle>Data processed successfully!</AlertTitle>
                  <AlertDescription>
                    Your customer dataset has been cleaned and analyzed
                  </AlertDescription>
                </Alert>

                {/* Metrics Grid */}
                <MetricsGrid metrics={cleanedData.metrics} />

                {/* Detailed Metrics */}
                <DetailedMetrics metrics={cleanedData.metrics} />

                {/* Charts */}
                <div className="grid gap-6 md:grid-cols-2">
                  <QualityChart
                    data={[
                      {
                        name: "Current",
                        quality: cleanedData.metrics.qualityScore,
                        completeness: cleanedData.metrics.completenessScore,
                      },
                    ]}
                  />

                  <DuplicateDistributionChart
                    data={[
                      {
                        name: "Unique",
                        count:
                          cleanedData.metrics.totalRecords -
                          cleanedData.metrics.duplicateRecords,
                      },
                      {
                        name: "Duplicates",
                        count: cleanedData.metrics.duplicateRecords,
                      },
                    ]}
                  />

                  <CustomerSegmentationChart
                    data={[
                      {
                        name: "Valid",
                        value:
                          cleanedData.metrics.totalRecords -
                          cleanedData.issues.length,
                        color: "#10b981",
                      },
                      {
                        name: "Issues Found",
                        value:
                          new Set(cleanedData.issues.map((i) => i.recordId))
                            .size,
                        color: "#ef4444",
                      },
                    ]}
                  />

                  <MissingFieldsChart
                    data={[
                      {
                        field: "Email",
                        missing: cleanedData.metrics.invalidEmails,
                      },
                      {
                        field: "Phone",
                        missing: cleanedData.metrics.invalidPhones,
                      },
                      {
                        field: "Other Fields",
                        missing: cleanedData.metrics.missingFields,
                      },
                    ]}
                  />
                </div>

                {/* Data Preview */}
                <CleanedDataPreview
                  records={cleanedData.cleanedRecords}
                  totalRecords={cleanedData.metrics.totalRecords}
                />

                {/* Issues */}
                {cleanedData.issues.length > 0 && (
                  <DataIssueList issues={cleanedData.issues} limit={15} />
                )}

                {/* AI Recommendations */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    AI-Powered Insights
                  </h2>
                  <AIRecommendationsPanel
                    recommendations={recommendations}
                    isLoading={!recommendations}
                  />
                </div>

                {/* Export Options */}
                <ExportOptions
                  recordCount={cleanedData.metrics.totalRecords}
                  isLoading={isProcessing}
                />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
