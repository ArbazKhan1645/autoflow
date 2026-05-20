"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CategoryPerformance, PipelineStage, TimeSeriesPoint } from "@/models";

const colors = ["#1769e0", "#00a8cc", "#0f9f6e", "#d97706", "#64748b", "#2563eb"];

export function RevenueAreaChart({ data }: { data: TimeSeriesPoint[] }) {
  return (
    <ResponsiveContainer height={280} width="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#1769e0" stopOpacity={0.34} />
            <stop offset="95%" stopColor="#1769e0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" stroke="#64748b" tickLine={false} />
        <YAxis stroke="#64748b" tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} />
        <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
        <Area
          dataKey="revenue"
          fill="url(#revenueFill)"
          stroke="#1769e0"
          strokeWidth={3}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CategoryBarChart({ data }: { data: CategoryPerformance[] }) {
  return (
    <ResponsiveContainer height={280} width="100%">
      <BarChart data={data}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="category" stroke="#64748b" tickLine={false} />
        <YAxis stroke="#64748b" tickLine={false} />
        <Tooltip />
        <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell fill={colors[index % colors.length]} key={entry.category} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PipelinePieChart({ data }: { data: PipelineStage[] }) {
  return (
    <ResponsiveContainer height={260} width="100%">
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          dataKey="value"
          innerRadius={62}
          outerRadius={96}
          paddingAngle={4}
        >
          {data.map((entry, index) => (
            <Cell fill={colors[index % colors.length]} key={entry.stage} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
