"use client";

import { useState } from "react";
import { Layers3, ListPlus, PackagePlus, Plus } from "lucide-react";
import { AdminSheet } from "@/components/admin/admin-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { useCatalog } from "@/components/providers/client-config-provider";

type SheetMode = "category" | "subcategory" | "subproduct" | null;

export function CategoryManagementScreen() {
  const { megaMenu, storefrontProducts } = useCatalog();
  const [sheet, setSheet] = useState<SheetMode>(null);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="CRM Categories"
        title="Categories, subcategories and sub products"
        description="Manage the storefront mega-menu structure and product hierarchy from one admin screen."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setSheet("subcategory")}><ListPlus className="h-4 w-4" /> Add sub category</Button>
            <Button variant="outline" onClick={() => setSheet("subproduct")}><PackagePlus className="h-4 w-4" /> Add sub product</Button>
            <Button onClick={() => setSheet("category")}><Plus className="h-4 w-4" /> Add category</Button>
          </div>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <Panel className="p-5">
          <div className="flex items-center gap-2">
            <Layers3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-black text-slate-950">Mega menu tree</h2>
          </div>
          <div className="mt-5 space-y-4">
            {megaMenu.map((category) => (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={category.label}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-slate-950">{category.label}</p>
                  <Badge tone="blue">{category.children.length}</Badge>
                </div>
                <div className="mt-3 space-y-2">
                  {category.children.map((child) => (
                    <div className="rounded-md bg-white p-3 text-sm" key={child.label}>
                      <p className="font-black text-slate-800">{child.label}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        {child.products.map((item) => item.label).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-black text-slate-950">Sub product mapping</h2>
            <p className="mt-1 text-sm text-slate-500">Storefront products grouped by category and child category.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Sub category</th>
                  <th className="px-5 py-3">Child</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {storefrontProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-5 py-4 font-black text-slate-950">{product.name}</td>
                    <td className="px-5 py-4"><Badge tone="blue">{product.category}</Badge></td>
                    <td className="px-5 py-4">{product.subCategory}</td>
                    <td className="px-5 py-4">{product.childCategory}</td>
                    <td className="px-5 py-4"><Badge tone={product.hot ? "amber" : "slate"}>{product.hot ? "Hot" : "Standard"}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <AdminSheet
        open={sheet !== null}
        title={
          sheet === "category"
            ? "Add category"
            : sheet === "subcategory"
              ? "Add sub category"
              : "Add sub product"
        }
        description="Create hierarchy entries used by the public mega-menu and product filters."
        onClose={() => setSheet(null)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSheet(null)}>Cancel</Button>
            <Button onClick={() => setSheet(null)}>Save</Button>
          </div>
        }
      >
        <div className="grid gap-4">
          {sheet !== "category" ? (
            <Select defaultValue="Car Accessories">
              {megaMenu.map((item) => (
                <option key={item.label}>{item.label}</option>
              ))}
            </Select>
          ) : null}
          <Input placeholder={sheet === "subproduct" ? "Sub product name" : "Name"} />
          <Input placeholder="Slug / URL path" />
          <textarea className="min-h-28 rounded-lg border border-slate-300 p-3 text-sm" placeholder="Description" />
          <Input placeholder="SEO title" />
          <Input placeholder="Sort order" type="number" />
        </div>
      </AdminSheet>
    </div>
  );
}
