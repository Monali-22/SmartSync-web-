"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QualityChartProps {
  data: Array<{
    name: string;
    quality: number;
    completeness: number;
  }>;
}

export function QualityChart({ data }: QualityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Quality Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="quality"
              stroke="#3b82f6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="completeness"
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface DuplicateChartProps {
  data: Array<{
    name: string;
    count: number;
  }>;
}

export function DuplicateDistributionChart({ data }: DuplicateChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Duplicate Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface SegmentationChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function CustomerSegmentationChart({
  data,
}: SegmentationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Segmentation</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface MissingFieldsChartProps {
  data: Array<{
    field: string;
    missing: number;
  }>;
}

export function MissingFieldsChart({ data }: MissingFieldsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Missing Fields by Column</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="field" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="missing" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
