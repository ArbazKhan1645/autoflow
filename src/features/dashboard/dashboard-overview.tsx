"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";
import { CategoryBarChart, RevenueAreaChart } from "@/components/charts/analytics-charts";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusPill } from "@/components/ui/status-pill";
import { useAnalyticsOverview } from "@/hooks/use-analytics";
import { useInventoryOverview } from "@/hooks/use-inventory";
import { useOrders } from "@/hooks/use-orders";
import { currency, formatDate } from "@/lib/utils";

const metricIcons = [DollarSign, Users, BarChart3, Package];

const quickLinks = [
  { label: "Create order", href: "/cart", icon: ShoppingCart },
  { label: "Review customers", href: "/crm", icon: Users },
  { label: "Stock alerts", href: "/inventory", icon: Warehouse },
  { label: "AI assistant", href: "/ai", icon: BellRing },
];

export function DashboardOverview() {
  const analytics = useAnalyticsOverview();
  const inventory = useInventoryOverview();
  const orders = useOrders({ status: "all" });

  const loading = analytics.isLoading || inventory.isLoading || orders.isLoading;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Command center"
        title="Automotive operations dashboard"
        description="Revenue, orders, inventory and AI-assisted sales workflows in one connected workspace."
        action={
          <Link
            className={buttonClassName({ variant: "primary", size: "md" })}
            href="/catalog"
          >
            Search catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-36" key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {analytics.data?.metrics.map((metric, index) => (
            <MetricCard icon={metricIcons[index]} key={metric.id} metric={metric} />
          ))}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
        <Panel className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Revenue momentum
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Orders, inquiries and stock turnover.
              </p>
            </div>
            <Badge tone="green">+18%</Badge>
          </div>
          {analytics.data ? (
            <RevenueAreaChart data={analytics.data.timeSeries} />
          ) : (
            <Skeleton className="h-72" />
          )}
        </Panel>

        <Panel className="p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Fast actions
          </h2>
          <div className="mt-4 grid gap-3">
            {quickLinks.map((link) => (
              <Link
                className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 transition hover:border-primary/30 hover:bg-blue-50 dark:border-white/10 dark:bg-white/5"
                href={link.href}
                key={link.href}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-sm dark:bg-white/10">
                  <link.icon className="h-5 w-5" />
                </div>
                <span className="flex-1 text-sm font-bold text-slate-800 dark:text-white">
                  {link.label}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
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
              Live order board
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Recent order status and tracking.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-white/5">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {orders.data?.slice(0, 5).map((order) => (
                  <tr key={order.orderId}>
                    <td className="px-5 py-4 font-bold text-slate-950 dark:text-white">
                      {order.orderId}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {order.customerInfo.company}
                    </td>
                    <td className="px-5 py-4 font-semibold">
                      {currency.format(order.total)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill status={order.orderStatus} />
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {formatDate(order.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <Panel className="p-5">
        <div className="grid gap-4 md:grid-cols-3">
          {inventory.data?.lowStockAlerts.map((alert) => (
            <div
              className="rounded-lg border border-amber-200 bg-amber-50 p-4"
              key={alert.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-950">
                    {alert.productName}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {alert.sku} / warehouse {alert.warehouseId}
                  </p>
                </div>
                <StatusPill status={alert.severity} />
              </div>
              <p className="mt-4 text-sm text-slate-700">
                Current {alert.currentStock} vs minimum {alert.minimumStock}.
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
