"use client";

import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput, Select } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { SkeletonGrid } from "@/components/ui/skeleton";
import { useCatalogCategories, useProducts } from "@/hooks/use-products";
import type { Product, ProductCategory, ProductFilters } from "@/models";
import { useCartStore } from "@/store/cart-store";
import { useNotificationStore } from "@/store/notification-store";
import { ProductCard } from "./product-card";

export function CatalogScreen() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const [sort, setSort] = useState<ProductFilters["sort"]>("relevance");
  const [stockMode, setStockMode] = useState<"all" | "low">("all");

  const filters = useMemo<ProductFilters>(
    () => ({
      search,
      category,
      sort,
      lowStock: stockMode === "low",
    }),
    [category, search, sort, stockMode],
  );

  const products = useProducts(filters);
  const categories = useCatalogCategories();
  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useNotificationStore((state) => state.pushToast);

  const handleAdd = (product: Product) => {
    addItem(product, 1);
    pushToast({
      title: "Added to cart",
      message: `${product.productName} is ready for order review.`,
      severity: "success",
    });
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Parts catalog"
        title="Search, price and sell every SKU"
        description="Production-style catalog with compatibility, warehouse stock, commercial pricing and order actions."
      />

      <div className="grid gap-3 rounded-lg border border-border-soft bg-white/76 p-3 shadow-sm shadow-blue-900/5 backdrop-blur dark:bg-white/5 md:grid-cols-[1fr_180px_180px_150px]">
        <SearchInput
          placeholder="Search SKU, part, vehicle, brand..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value as ProductCategory | "All")}
        >
          <option value="All">All categories</option>
          {categories.data?.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
        <Select
          value={sort}
          onChange={(event) => setSort(event.target.value as ProductFilters["sort"])}
        >
          <option value="relevance">Relevance</option>
          <option value="rating">Rating</option>
          <option value="stock">Stock</option>
          <option value="price-asc">Price low</option>
          <option value="price-desc">Price high</option>
        </Select>
        <Select
          value={stockMode}
          onChange={(event) => setStockMode(event.target.value as "all" | "low")}
        >
          <option value="all">All stock</option>
          <option value="low">Low stock</option>
        </Select>
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
        <Filter className="h-4 w-4" />
        {products.data?.length ?? 0} matching products
        <span className="mx-1 h-1 w-1 rounded-full bg-slate-300" />
        <SlidersHorizontal className="h-4 w-4" />
        Service-backed filters
      </div>

      {products.isLoading ? <SkeletonGrid count={6} /> : null}

      {!products.isLoading && products.data?.length === 0 ? (
        <EmptyState
          title="No matching parts"
          description="Try another SKU, vehicle, category or stock filter."
        />
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.data?.map((product) => (
          <ProductCard key={product.id} onAdd={handleAdd} product={product} />
        ))}
      </div>
    </div>
  );
}
