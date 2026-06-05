"use client";

import * as React from "react";
import { cn } from "@/lib/utils/helpers";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white",
      ghost:
        "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white",
      outline:
        "border border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs rounded-md",
      lg: "h-12 px-8 text-base rounded-lg",
      icon: "h-10 w-10 rounded-full",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
