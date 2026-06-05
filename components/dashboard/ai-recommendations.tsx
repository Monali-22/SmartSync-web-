"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIRecommendations } from "@/lib/types";
import { Lightbulb, TrendingUp, Zap } from "lucide-react";

interface AIRecommendationsPanelProps {
  recommendations: AIRecommendations | null;
  isLoading?: boolean;
}

export function AIRecommendationsPanel({
  recommendations,
  isLoading,
}: AIRecommendationsPanelProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload a dataset to get AI-powered recommendations
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quality Improvements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-blue-500" />
            <span>Quality Improvements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.qualityImprovements.map((item, i) => (
              <li key={i} className="flex items-start space-x-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Data Collection Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Data Collection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.dataCollectionSuggestions.map((item, i) => (
              <li key={i} className="flex items-start space-x-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* CRM Optimizations */}
      <Card>
        <CardHeader>
          <CardTitle>CRM Optimizations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.crmOptimizations.map((item, i) => (
              <li key={i} className="flex items-start space-x-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Retention Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Retention Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.retentionOpportunities.map((item, i) => (
              <li key={i} className="flex items-start space-x-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Marketing Readiness */}
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader>
          <CardTitle>Marketing Readiness Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {recommendations.marketingReadinessAssessment}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
