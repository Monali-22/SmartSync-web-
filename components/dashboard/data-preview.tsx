"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CustomerRecord } from "@/lib/types";
import { truncateString } from "@/lib/utils/helpers";

interface CleanedDataPreviewProps {
  records: CustomerRecord[];
  totalRecords: number;
}

export function CleanedDataPreview({
  records,
  totalRecords,
}: CleanedDataPreviewProps) {
  const displayRecords = records.slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cleaned Data Preview</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {displayRecords.length} of {totalRecords} records
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Email
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Company
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {displayRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    {record.firstName} {record.lastName}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {truncateString(record.email, 25)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {truncateString(record.phone, 20)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {truncateString(record.company, 20)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {record.city}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalRecords > 10 && (
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            ... and {totalRecords - 10} more records
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface DataIssueListProps {
  issues: Array<{
    id: string;
    recordId: string;
    type: "duplicate" | "missing" | "invalid" | "formatting";
    field: string;
    message: string;
    severity: "low" | "medium" | "high";
  }>;
  limit?: number;
}

export function DataIssueList({ issues, limit = 20 }: DataIssueListProps) {
  const displayIssues = issues.slice(0, limit);

  const severityColors = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
  };

  const typeColors = {
    duplicate: "bg-purple-100 text-purple-800 dark:bg-purple-900/30",
    missing: "bg-orange-100 text-orange-800 dark:bg-orange-900/30",
    invalid: "bg-red-100 text-red-800 dark:bg-red-900/30",
    formatting: "bg-blue-100 text-blue-800 dark:bg-blue-900/30",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Issues Found</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {issues.length} total issues
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayIssues.map((issue) => (
            <div
              key={issue.id}
              className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {issue.message}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Record ID: {issue.recordId.slice(0, 12)}...
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={typeColors[issue.type]}>
                    {issue.type}
                  </Badge>
                  <Badge className={severityColors[issue.severity]}>
                    {issue.severity}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {issues.length > limit && (
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            ... and {issues.length - limit} more issues
          </div>
        )}
      </CardContent>
    </Card>
  );
}
