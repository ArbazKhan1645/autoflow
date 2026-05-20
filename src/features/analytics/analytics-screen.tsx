"use client";

import { BarChart3, DollarSign, Package, Users } from "lucide-react";
import {
  CategoryBarChart,
  PipelinePieChart,
  RevenueAreaChart,
} from "@/components/charts/analytics-charts";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyticsOverview } from "@/hooks/use-analytics";
import { currency } from "@/lib/utils";

const icons = [DollarSign, Users, BarChart3, Package];

export function AnalyticsScreen() {
  const analytics = useAnalyticsOverview();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Analytics"
        title="Revenue, pipeline and inventory intelligence"
        description="Executive view across sales performance, inquiry pipeline, product categories and stock turnover."
      />

      {analytics.isLoading ? (
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-36" key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {analytics.data?.metrics.map((metric, index) => (
            <MetricCard icon={icons[index]} key={metric.id} metric={metric} />
          ))}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Panel className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Revenue and demand
            </h2>
            <Badge tone="green">Forecast positive</Badge>
          </div>
          {analytics.data ? (
            <RevenueAreaChart data={analytics.data.timeSeries} />
          ) : (
            <Skeleton className="h-72" />
          )}
        </Panel>
        <Panel className="p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Sales pipeline
          </h2>
          {analytics.data ? (
            <>
              <PipelinePieChart data={analytics.data.pipelineStages} />
              <div className="mt-3 grid gap-2">
                {analytics.data.pipelineStages.map((stage) => (
                  <div
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-white/5"
                    key={stage.stage}
                  >
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {stage.stage}
                    </span>
                    <span className="font-black">{currency.format(stage.value)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Skeleton className="h-72" />
          )}
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel className="p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Category performance
          </h2>
          {analytics.data ? (
            <CategoryBarChart data={analytics.data.categoryPerformance} />
          ) : (
            <Skeleton className="h-72" />
          )}
        </Panel>

        <Panel className="overflow-hidden">
          <div className="border-b border-border-soft p-5">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Margin and units
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-white/5">
                <tr>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Revenue</th>
                  <th className="px-5 py-3">Margin</th>
                  <th className="px-5 py-3">Units</th>
                  <th className="px-5 py-3">Signal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {analytics.data?.categoryPerformance.map((category) => (
                  <tr key={category.category}>
                    <td className="px-5 py-4 font-black">{category.category}</td>
                    <td className="px-5 py-4">{currency.format(category.revenue)}</td>
                    <td className="px-5 py-4">{category.margin}%</td>
                    <td className="px-5 py-4">{category.units}</td>
                    <td className="px-5 py-4">
                      <Badge tone={category.margin > 44 ? "green" : "blue"}>
                        {category.margin > 44 ? "High margin" : "Stable"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
