"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataQualityMetrics } from "@/lib/types";
import { AlertCircle, CheckCircle2, TrendingUp, Users } from "lucide-react";

interface MetricsGridProps {
  metrics: DataQualityMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const metrics_data = [
    {
      icon: Users,
      label: "Total Records",
      value: metrics.totalRecords,
      color: "blue",
    },
    {
      icon: AlertCircle,
      label: "Duplicates Found",
      value: metrics.duplicateRecords,
      color: "orange",
    },
    {
      icon: TrendingUp,
      label: "Quality Score",
      value: `${metrics.qualityScore}%`,
      color: "green",
    },
    {
      icon: CheckCircle2,
      label: "Completeness",
      value: `${metrics.completenessScore}%`,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics_data.map((item, index) => {
        const Icon = item.icon;
        const colorClasses = {
          blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
          orange:
            "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
          green:
            "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
          purple:
            "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
        };

        return (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface DetailedMetricsProps {
  metrics: DataQualityMetrics;
}

export function DetailedMetrics({ metrics }: DetailedMetricsProps) {
  const details = [
    {
      label: "Missing Fields",
      value: metrics.missingFields,
      icon: AlertCircle,
      color: "orange",
    },
    {
      label: "Invalid Emails",
      value: metrics.invalidEmails,
      icon: AlertCircle,
      color: "red",
    },
    {
      label: "Invalid Phones",
      value: metrics.invalidPhones,
      icon: AlertCircle,
      color: "red",
    },
    {
      label: "Duplicate Rate",
      value: `${metrics.duplicateRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: "blue",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Quality Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            const colorClasses = {
              orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
              red: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
              blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
            };

            return (
              <div key={index} className="flex items-center justify-between pb-4 last:pb-0">
                <div className="flex items-center space-x-3">
                  <div
                    className={`rounded-lg p-2 ${colorClasses[detail.color as keyof typeof colorClasses]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {detail.label}
                  </span>
                </div>
                <Badge variant="default">{detail.value}</Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
