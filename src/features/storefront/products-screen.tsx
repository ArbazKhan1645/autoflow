"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Filter, Gift, Search, ShoppingBag, SlidersHorizontal, Star } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/card";
import { Select } from "@/components/ui/input";
import { megaMenu, storefrontProducts, type StorefrontProduct } from "@/data/storefront";
import { currency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useNotificationStore } from "@/store/notification-store";

const offerBanners = [
  {
    title: "Weekend interior package",
    description: "Bundle 9D mats, dash mat and console organizer for a cleaner cabin.",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Lighting upgrade deal",
    description: "Premium LED assemblies with fitment review before dispatch.",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
  },
];

function ProductCard({ product }: { product: StorefrontProduct }) {
  const addStorefrontItem = useCartStore((state) => state.addStorefrontItem);
  const pushToast = useNotificationStore((state) => state.pushToast);

  return (
    <Panel className="group overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-52 bg-slate-100">
          <Image
            alt={product.name}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            src={product.image}
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge tone={product.hot ? "amber" : "blue"}>{product.badge}</Badge>
          </div>
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
          {product.category} / {product.childCategory}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h2 className="mt-2 line-clamp-2 min-h-12 text-lg font-black text-slate-950 transition hover:text-primary">
            {product.name}
          </h2>
        </Link>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
          <span className="rounded-full bg-slate-100 px-2.5 py-1">{product.fitment}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1">{product.stock} stock</span>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-black text-slate-950">
              {currency.format(product.price)}
            </p>
            {product.compareAt ? (
              <p className="text-sm font-bold text-slate-400 line-through">
                {currency.format(product.compareAt)}
              </p>
            ) : null}
          </div>
          <Button
            size="sm"
            onClick={() => {
              addStorefrontItem(product);
              pushToast({
                title: "Added to cart",
                message: "Open My Account to checkout.",
              });
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export function ProductsScreen() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const initialCategory = searchParams.get("category") ?? "All";
  const hotOnly = searchParams.get("hot") === "true";
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");

  const categories = ["All", ...megaMenu.map((item) => item.label)];
  const subcategories = Array.from(
    new Set(storefrontProducts.map((product) => product.subCategory)),
  );

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    let rows = storefrontProducts.filter((product) => {
      const matchesQuery = [
        product.name,
        product.category,
        product.subCategory,
        product.childCategory,
        product.fitment,
        product.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
      const matchesCategory = category === "All" || product.category === category;
      const matchesHot = !hotOnly || product.hot;
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-75" && product.price < 75) ||
        (priceRange === "75-200" && product.price >= 75 && product.price <= 200) ||
        (priceRange === "200-plus" && product.price > 200);

      return matchesQuery && matchesCategory && matchesHot && matchesPrice;
    });

    if (sort === "price-low") rows = rows.sort((a, b) => a.price - b.price);
    if (sort === "price-high") rows = rows.sort((a, b) => b.price - a.price);
    if (sort === "rating") rows = rows.sort((a, b) => b.rating - a.rating);
    if (sort === "featured") rows = rows.sort((a, b) => Number(b.hot) - Number(a.hot));
    return rows;
  }, [category, hotOnly, priceRange, search, sort]);

  return (
    <PublicPageShell>
      <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center opacity-38" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-blue-950/65" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
            Product page
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-normal">
            Browse premium auto parts with fitment, offers and filters.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Search accessories, lighting, performance kits, detailing and
            service products. Add items to your account cart and complete checkout.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[290px_1fr] lg:px-8">
          <aside className="space-y-4">
            <Panel className="p-5">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                <h2 className="font-black text-slate-950">Filters</h2>
              </div>
              <div className="mt-5 grid gap-4">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm font-medium text-slate-950 shadow-sm outline-none ring-1 ring-slate-200/80 placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-blue-100"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
                <Select value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
                  <option value="all">All prices</option>
                  <option value="under-75">Under $75</option>
                  <option value="75-200">$75 - $200</option>
                  <option value="200-plus">$200+</option>
                </Select>
                <Select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="rating">Highest rating</option>
                  <option value="price-low">Price low</option>
                  <option value="price-high">Price high</option>
                </Select>
              </div>
            </Panel>

            <Panel className="p-5">
              <h3 className="font-black text-slate-950">Categories</h3>
              <div className="mt-4 grid gap-2">
                {subcategories.map((item) => (
                  <button
                    className="rounded-lg bg-slate-50 px-3 py-2 text-left text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-primary"
                    key={item}
                    type="button"
                    onClick={() => setSearch(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </Panel>
          </aside>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {offerBanners.map((banner) => (
                <Panel className="overflow-hidden" key={banner.title}>
                  <div className="grid min-h-48 grid-cols-[1fr_150px]">
                    <div className="p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-primary">
                        <Gift className="h-5 w-5" />
                      </div>
                      <h2 className="mt-4 text-xl font-black text-slate-950">
                        {banner.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {banner.description}
                      </p>
                    </div>
                    <div className="relative">
                      <Image
                        alt={banner.title}
                        className="object-cover"
                        fill
                        sizes="150px"
                        src={banner.image}
                      />
                    </div>
                  </div>
                </Panel>
              ))}
            </div>

            <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                {filtered.length} products matched
              </div>
              <div className="flex flex-wrap gap-2">
                {["Fitment checked", "Secure checkout", "Premium stock"].map((item) => (
                  <Badge key={item} tone="blue">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try another category, fitment, accessory name or price range."
              />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product, index) => (
                  <div className={index === 5 ? "md:col-span-2 xl:col-span-3" : ""} key={product.id}>
                    {index === 5 ? (
                      <div className="mb-5 rounded-lg bg-slate-950 p-6 text-white">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
                          Package banner
                        </p>
                        <h2 className="mt-3 text-3xl font-black tracking-normal">
                          Build a full cabin upgrade with mats, dash protection and organizers.
                        </h2>
                        <p className="mt-3 max-w-2xl text-slate-300">
                          Add three interior products and our support team can verify fitment before dispatch.
                        </p>
                      </div>
                    ) : null}
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
