"use client";

import { AlertTriangle, Download, FileUp, PackageCheck, RotateCw, Warehouse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusPill } from "@/components/ui/status-pill";
import { useInventoryOverview } from "@/hooks/use-inventory";
import { useProducts } from "@/hooks/use-products";
import { formatDate } from "@/lib/utils";

export function InventoryScreen() {
  const inventory = useInventoryOverview();
  const lowStockProducts = useProducts({ lowStock: true });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Inventory"
        title="Stock, warehouse and replenishment control"
        description="Warehouse-level quantities, low stock alerts, movement history, import/export structure and inventory analytics."
        action={
          <div className="flex gap-2">
            <Button variant="outline"><FileUp className="h-4 w-4" /> Import</Button>
            <Button><Download className="h-4 w-4" /> Export</Button>
          </div>
        }
      />

      {inventory.isLoading ? (
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-32" key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-4">
          <Panel className="p-5">
            <PackageCheck className="h-6 w-6 text-primary" />
            <p className="mt-4 text-2xl font-black">{inventory.data?.totalStock}</p>
            <p className="text-sm font-semibold text-slate-500">Total stock</p>
          </Panel>
          <Panel className="p-5">
            <RotateCw className="h-6 w-6 text-primary" />
            <p className="mt-4 text-2xl font-black">{inventory.data?.reservedStock}</p>
            <p className="text-sm font-semibold text-slate-500">Reserved units</p>
          </Panel>
          <Panel className="p-5">
            <AlertTriangle className="h-6 w-6 text-warning" />
            <p className="mt-4 text-2xl font-black">{inventory.data?.lowStockCount}</p>
            <p className="text-sm font-semibold text-slate-500">Low stock SKUs</p>
          </Panel>
          <Panel className="p-5">
            <Warehouse className="h-6 w-6 text-primary" />
            <p className="mt-4 text-2xl font-black">{inventory.data?.warehouses.length}</p>
            <p className="text-sm font-semibold text-slate-500">Warehouses</p>
          </Panel>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Low stock alerts
            </h2>
            <Badge tone="amber">{inventory.data?.lowStockAlerts.length ?? 0} alerts</Badge>
          </div>
          <div className="mt-4 space-y-3">
            {inventory.data?.lowStockAlerts.map((alert) => (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4" key={alert.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-slate-950">{alert.productName}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {alert.sku} / {alert.warehouseId}
                    </p>
                  </div>
                  <StatusPill status={alert.severity} />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span>{alert.currentStock} current</span>
                  <span>{alert.minimumStock} minimum</span>
                </div>
                <Progress className="mt-2 bg-amber-100" value={(alert.currentStock / alert.minimumStock) * 100} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Warehouse management
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {inventory.data?.warehouses.map((warehouse) => (
              <div className="rounded-lg border border-border-soft bg-white p-4 dark:bg-white/5" key={warehouse.id}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-black text-slate-950 dark:text-white">{warehouse.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{warehouse.region}</p>
                  </div>
                  <Warehouse className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {warehouse.address}
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Capacity</span>
                    <span>{warehouse.capacityUsed}%</span>
                  </div>
                  <Progress className="mt-2" value={warehouse.capacityUsed} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-md bg-blue-50 p-2">
                    <p className="font-black text-primary">{warehouse.inboundShipments}</p>
                    <p className="text-[11px] font-bold text-slate-500">Inbound</p>
                  </div>
                  <div className="rounded-md bg-emerald-50 p-2">
                    <p className="font-black text-success">{warehouse.outboundShipments}</p>
                    <p className="text-[11px] font-bold text-slate-500">Outbound</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Panel className="overflow-hidden">
          <div className="border-b border-border-soft p-5">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Recent stock movements
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-white/5">
                <tr>
                  <th className="px-5 py-3">SKU</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">Reference</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {inventory.data?.stockMovements.map((movement) => (
                  <tr key={movement.id}>
                    <td className="px-5 py-4 font-bold">{movement.sku}</td>
                    <td className="px-5 py-4">{movement.productName}</td>
                    <td className="px-5 py-4"><StatusPill status={movement.type} /></td>
                    <td className="px-5 py-4 font-black">{movement.quantity}</td>
                    <td className="px-5 py-4">{movement.reference}</td>
                    <td className="px-5 py-4 text-slate-500">{formatDate(movement.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Reorder candidates
          </h2>
          <div className="mt-4 space-y-3">
            {lowStockProducts.data?.map((product) => (
              <div className="rounded-lg border border-border-soft bg-white p-4 dark:bg-white/5" key={product.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-slate-950 dark:text-white">{product.productName}</p>
                    <p className="text-xs font-semibold text-slate-500">{product.sku}</p>
                  </div>
                  <Badge tone="red">{product.stockQuantity}</Badge>
                </div>
                <Progress className="mt-3" value={(product.stockQuantity / product.minimumStock) * 100} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
