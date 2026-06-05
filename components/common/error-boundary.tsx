"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 dark:border-red-800 dark:bg-red-900/20 max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
                Something went wrong
              </h2>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="w-full"
            >
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
