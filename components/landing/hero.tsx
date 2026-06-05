"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  BarChart3,
  Database,
  Sparkles,
  Shield,
} from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20"></div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-900 dark:bg-blue-900/20">
            <Sparkles className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              AI-powered data cleaning
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
            Clean Your Customer{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Data Instantly
            </span>
          </h1>

          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enterprise-grade data integration. Detect duplicates, standardize
            formats, and prepare customer data for CRM in minutes, not days.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            ✓ No credit card required • ✓ Free sample data • ✓ Processing in seconds
          </p>
        </div>
      </div>
    </section>
  );
}

export function LandingFeatures() {
  const features = [
    {
      icon: Database,
      title: "Data Quality Dashboard",
      description:
        "Real-time metrics on duplicates, missing fields, and data quality scores",
    },
    {
      icon: Zap,
      title: "AI-Powered Cleaning",
      description:
        "Automatically detect and merge duplicate records with confidence scoring",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Segment customers, analyze trends, and visualize data quality improvements",
    },
    {
      icon: Shield,
      title: "Enterprise Ready",
      description:
        "GDPR compliant, secure processing, and audit trails for compliance",
    },
    {
      icon: Sparkles,
      title: "AI Recommendations",
      description:
        "Get actionable insights using Google Gemini API for data optimization",
    },
    {
      icon: ArrowRight,
      title: "One-Click Export",
      description:
        "Export cleaned data as CSV, PDF reports, or direct CRM integration",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Enterprise Data Teams
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to manage and optimize customer data quality
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-6 hover:border-blue-300 hover:shadow-lg transition-all dark:border-gray-800 dark:bg-gray-800 dark:hover:border-blue-700"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-3 dark:bg-blue-900/20">
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LandingCTA() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-12 text-center dark:border-gray-800 dark:from-blue-900/20 dark:to-purple-900/20">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Ready to transform your customer data?
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            Join hundreds of companies using SmartSync AI to clean and optimize
            their customer data.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="group">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
