"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { megaMenu, storefrontProducts } from "@/data/storefront";
import { cn, currency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import { Button } from "../ui/button";

const navItems = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

export function PublicHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useCustomerAuthStore((state) => state.user);
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const submitSearch = () => {
    const query = search.trim();
    router.push(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link className="flex shrink-0 items-center gap-3" href="/">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-blue-500/25">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-normal text-slate-950">
              AutoFlow Parts
            </span>
            <span className="hidden text-xs font-bold uppercase tracking-[0.14em] text-primary sm:block">
              Premium auto store
            </span>
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 lg:block">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-28 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Search mats, headlamps, anti theft locks, MG HS floor mats..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitSearch();
              }}
            />
            <button
              className="absolute right-1.5 top-1.5 h-9 rounded-md bg-primary px-4 text-sm font-bold text-white transition hover:bg-blue-700"
              type="button"
              onClick={submitSearch}
            >
              Search
            </button>
          </label>
        </div>

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-primary",
                pathname === item.href && "bg-blue-50 text-primary",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="relative hidden h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-primary/30 hover:text-primary sm:inline-flex"
          href="/account"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          ) : null}
        </Link>

        <Link
          className="hidden h-11 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-primary md:inline-flex"
          href={user ? "/account" : "/auth"}
        >
          <UserRound className="h-4 w-4" />
          {user ? "My Account" : "Sign In"}
        </Link>

        <Button
          aria-label="Open menu"
          className="ml-auto xl:hidden"
          size="icon"
          variant="outline"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="hidden border-t border-slate-100 bg-white xl:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
          {megaMenu.map((category) => (
            <div className="group relative" key={category.label}>
              <Link
                className="flex h-12 items-center gap-1 rounded-lg px-4 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-primary"
                href={category.href}
              >
                {category.label}
                <ChevronDown className="h-4 w-4" />
              </Link>
              <div className="invisible absolute left-0 top-full w-[880px] translate-y-2 rounded-lg border border-slate-200 bg-white p-5 opacity-0 shadow-2xl shadow-blue-900/12 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-5">
                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                      {category.label}
                    </p>
                    {category.children.map((group) => (
                      <Link
                        className="block rounded-lg border border-slate-100 bg-slate-50 p-4 transition hover:border-primary/30 hover:bg-blue-50"
                        href={group.href}
                        key={group.label}
                      >
                        <p className="font-black text-slate-950">{group.label}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {group.products.length} product groups
                        </p>
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                      Subcategories
                    </p>
                    {category.children.flatMap((group) =>
                      group.products.map((product) => (
                        <Link
                          className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-primary"
                          href={product.href}
                          key={`${group.label}-${product.label}`}
                        >
                          {group.label} / {product.label}
                        </Link>
                      )),
                    )}
                  </div>
                  <div className="rounded-lg bg-slate-950 p-4 text-white">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                      Featured products
                    </p>
                    <div className="mt-4 space-y-3">
                      {storefrontProducts
                        .filter((product) => product.category === category.label || product.hot)
                        .slice(0, 3)
                        .map((product) => (
                          <Link
                            className="block rounded-lg bg-white/8 p-3 transition hover:bg-white/14"
                            href={`/products/${product.slug}`}
                            key={product.id}
                          >
                            <p className="line-clamp-1 text-sm font-bold">{product.name}</p>
                            <p className="mt-1 text-xs text-slate-300">
                              {currency.format(product.price)} / {product.fitment}
                            </p>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm xl:hidden">
          <div className="ml-auto h-full w-[min(92vw,390px)] overflow-y-auto bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-lg font-black">Menu</p>
              <Button
                aria-label="Close menu"
                size="icon"
                variant="ghost"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <label className="relative mt-4 block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-primary"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitSearch();
                }}
              />
            </label>
            <div className="mt-4 grid gap-2">
              {navItems.map((item) => (
                <Link
                  className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
                  href={item.href}
                  key={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white"
                href={user ? "/account" : "/auth"}
                onClick={() => setMobileOpen(false)}
              >
                {user ? "My Account" : "Sign In"}
              </Link>
            </div>
            <div className="mt-6 space-y-3">
              {megaMenu.map((category) => (
                <div className="rounded-lg border border-slate-200 p-3" key={category.label}>
                  <Link
                    className="font-black text-slate-950"
                    href={category.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {category.label}
                  </Link>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.children.flatMap((group) =>
                      group.products.slice(0, 3).map((item) => (
                        <Link
                          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary"
                          href={item.href}
                          key={`${category.label}-${item.label}`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
