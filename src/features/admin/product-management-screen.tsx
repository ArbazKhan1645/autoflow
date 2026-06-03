"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Download, PackagePlus, Search, SlidersHorizontal, Upload } from "lucide-react";
import { AdminSheet } from "@/components/admin/admin-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusPill } from "@/components/ui/status-pill";
import {
  useCatalog,
  useClientCurrency,
} from "@/components/providers/client-config-provider";

export function ProductManagementScreen() {
  const { currency } = useClientCurrency();
  const { products } = useCatalog();
  const [query, setQuery] = useState("");
  const [sheet, setSheet] = useState<"product" | "variant" | null>(null);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return products.filter((product) =>
      [
        product.productName,
        product.sku,
        product.category,
        product.brand,
        product.manufacturer,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="CRM Products"
        title="Product management"
        description="Create, update and manage enterprise SKU records, variants, pricing, stock and vehicle compatibility."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline"><Upload className="h-4 w-4" /> Import</Button>
            <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
            <Button onClick={() => setSheet("product")}><PackagePlus className="h-4 w-4" /> Add product</Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Active SKUs", products.filter((item) => item.status === "active").length],
          ["Featured", products.filter((item) => item.featured).length],
          ["Low stock", products.filter((item) => item.stockQuantity <= item.minimumStock).length],
          ["Backorder", products.filter((item) => item.status === "backorder").length],
        ].map(([label, value]) => (
          <Panel className="p-5" key={label}>
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
          </Panel>
        ))}
      </div>

      <Panel className="p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_190px_160px]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              placeholder="Search SKU, product, brand..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <Select defaultValue="all">
            <option value="all">All categories</option>
            <option>Engine</option>
            <option>Braking</option>
            <option>Lighting</option>
            <option>Performance</option>
          </Select>
          <Button variant="outline"><SlidersHorizontal className="h-4 w-4" /> Filters</Button>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-black text-slate-950">Product records</h2>
          <p className="mt-1 text-sm text-slate-500">{filtered.length} products returned</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Margin</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((product) => {
                const salePrice = product.discountPrice ?? product.sellingPrice;
                const margin = Math.round(((salePrice - product.buyingPrice) / salePrice) * 100);
                return (
                  <tr key={product.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-16 overflow-hidden rounded-lg bg-slate-100">
                          <Image alt={product.productName} className="object-cover" fill sizes="64px" src={product.thumbnail} />
                        </div>
                        <div>
                          <p className="font-black text-slate-950">{product.productName}</p>
                          <p className="text-xs font-bold text-slate-500">{product.sku} / {product.barcode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><Badge tone="blue">{product.category}</Badge></td>
                    <td className="px-5 py-4 font-black">{product.stockQuantity}</td>
                    <td className="px-5 py-4 font-black">{currency.format(salePrice)}</td>
                    <td className="px-5 py-4">{margin}%</td>
                    <td className="px-5 py-4"><StatusPill status={product.status} /></td>
                    <td className="px-5 py-4">
                      <Button size="sm" variant="outline" onClick={() => setSheet("variant")}>
                        Add variant
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <AdminSheet
        description="This form mirrors the backend-ready product schema. Supabase can replace this mock flow later."
        open={sheet === "product"}
        title="Add product"
        onClose={() => setSheet(null)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSheet(null)}>Cancel</Button>
            <Button onClick={() => setSheet(null)}>Save product</Button>
          </div>
        }
        size="lg"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Product name" />
          <Input placeholder="SKU" />
          <Input placeholder="Barcode" />
          <Select defaultValue="Engine">
            <option>Engine</option>
            <option>Braking</option>
            <option>Lighting</option>
            <option>Performance</option>
            <option>Car Accessories</option>
          </Select>
          <Input placeholder="Brand" />
          <Input placeholder="Manufacturer" />
          <Input placeholder="Buying price" type="number" />
          <Input placeholder="Selling price" type="number" />
          <Input placeholder="Stock quantity" type="number" />
          <Input placeholder="Minimum stock" type="number" />
          <textarea className="min-h-28 rounded-lg border border-slate-300 p-3 text-sm md:col-span-2" placeholder="Full description" />
          <Input className="md:col-span-2" placeholder="Vehicle compatibility" />
        </div>
      </AdminSheet>

      <AdminSheet
        description="Create a sub product or variant connected to the selected parent product."
        open={sheet === "variant"}
        title="Add sub product / variant"
        onClose={() => setSheet(null)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSheet(null)}>Cancel</Button>
            <Button onClick={() => setSheet(null)}>Save variant</Button>
          </div>
        }
      >
        <div className="grid gap-4">
          <Input placeholder="Variant name" />
          <Input placeholder="Variant SKU" />
          <Input placeholder="Color / size / fitment" />
          <Input placeholder="Additional price" type="number" />
          <Input placeholder="Variant stock" type="number" />
        </div>
      </AdminSheet>
    </div>
  );
}
