"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Sheet } from "lucide-react";

interface ExportOptionsProps {
  isLoading?: boolean;
  recordCount?: number;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
}

export function ExportOptions({
  isLoading,
  recordCount,
  onExportCSV,
  onExportPDF,
}: ExportOptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ready to export {recordCount || 0} cleaned records
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={onExportCSV}
              disabled={isLoading}
              variant="outline"
              className="flex items-center justify-center space-x-2"
            >
              <Sheet className="h-4 w-4" />
              <span>Export as CSV</span>
              <Download className="h-4 w-4" />
            </Button>

            <Button
              onClick={onExportPDF}
              disabled={isLoading}
              variant="outline"
              className="flex items-center justify-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Export as PDF</span>
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            💡 CSV is best for CRM integration. PDF includes full analytics report.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
