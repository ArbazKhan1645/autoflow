"use client";

import { useState } from "react";
import { Download, FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { SearchInput, Select } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusPill } from "@/components/ui/status-pill";
import { useOrders } from "@/hooks/use-orders";
import { currency, formatDate } from "@/lib/utils";
import type { OrderStatus, PaymentStatus } from "@/models";

const stages: OrderStatus[] = [
  "draft",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
];

export function OrdersScreen() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | "all">("all");
  const orders = useOrders({ search, status, paymentStatus });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Orders"
        title="Ordering, invoices and tracking"
        description="A realistic order desk for quotes, draft orders, payment state, packing and fulfillment visibility."
        action={<Button variant="outline"><Download className="h-4 w-4" /> Export CSV</Button>}
      />

      <div className="grid gap-3 rounded-lg border border-border-soft bg-white/76 p-3 shadow-sm shadow-blue-900/5 backdrop-blur dark:bg-white/5 md:grid-cols-[1fr_180px_180px]">
        <SearchInput
          placeholder="Search order, customer, product..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select value={status} onChange={(event) => setStatus(event.target.value as OrderStatus | "all")}>
          <option value="all">All statuses</option>
          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </Select>
        <Select
          value={paymentStatus}
          onChange={(event) => setPaymentStatus(event.target.value as PaymentStatus | "all")}
        >
          <option value="all">All payments</option>
          <option value="pending">Pending</option>
          <option value="partial">Partial</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {stages.map((stage) => {
          const count = orders.data?.filter((order) => order.orderStatus === stage).length ?? 0;
          return (
            <Panel className="p-4" key={stage}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                {stage}
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                {count}
              </p>
            </Panel>
          );
        })}
      </div>

      <Panel className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-border-soft p-5">
          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Order list
            </h2>
            <p className="text-sm text-slate-500">
              {orders.data?.length ?? 0} records returned
            </p>
          </div>
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        {orders.isLoading ? (
          <div className="p-5">
            <Skeleton className="h-80" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-white/5">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Products</th>
                  <th className="px-5 py-3">Payment</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Tracking</th>
                  <th className="px-5 py-3">Invoice</th>
                  <th className="px-5 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {orders.data?.map((order) => (
                  <tr key={order.orderId}>
                    <td className="px-5 py-4">
                      <p className="font-black text-slate-950 dark:text-white">
                        {order.orderId}
                      </p>
                      <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold">{order.customerInfo.company}</p>
                      <p className="text-xs text-slate-500">{order.customerInfo.fullName}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {order.products.map((line) => (
                          <Badge key={line.productId} tone="slate">
                            {line.quantity}x {line.sku}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill status={order.paymentStatus} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill status={order.orderStatus} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill status={order.trackingStatus} />
                    </td>
                    <td className="px-5 py-4">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                        {order.invoice.invoiceNumber}
                      </Button>
                    </td>
                    <td className="px-5 py-4 font-black">
                      {currency.format(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
