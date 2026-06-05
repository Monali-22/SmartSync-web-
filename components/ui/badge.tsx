"use client";

import * as React from "react";
import { cn } from "@/lib/utils/helpers";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
      success: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
      warning: "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100",
      error: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
      info: "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
