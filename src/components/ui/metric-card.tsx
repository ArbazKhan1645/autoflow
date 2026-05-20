import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn, compactNumber, currency } from "@/lib/utils";
import type { DashboardMetric } from "@/models";
import { Panel } from "./card";

function metricValue(metric: DashboardMetric) {
  if (metric.format === "currency") return currency.format(metric.value);
  if (metric.format === "percentage") return `${metric.value}%`;
  return compactNumber.format(metric.value);
}

export function MetricCard({
  metric,
  icon: Icon,
  className,
}: {
  metric: DashboardMetric;
  icon?: LucideIcon;
  className?: string;
}) {
  const TrendIcon =
    metric.trend === "up" ? ArrowUpRight : metric.trend === "down" ? ArrowDownRight : Minus;

  return (
    <Panel className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {metric.label}
          </p>
          <p className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">
            {metricValue(metric)}
          </p>
        </div>
        {Icon ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-primary dark:bg-blue-500/10">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
      <div
        className={cn(
          "mt-5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
          metric.trend === "up" && "bg-emerald-50 text-emerald-700",
          metric.trend === "down" && "bg-blue-50 text-blue-700",
          metric.trend === "flat" && "bg-slate-100 text-slate-600",
        )}
      >
        <TrendIcon className="h-3.5 w-3.5" />
        {Math.abs(metric.delta)}% this month
      </div>
    </Panel>
  );
}
