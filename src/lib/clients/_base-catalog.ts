// ─────────────────────────────────────────────────────────────
// Shared default catalog. This is NOT a client — it is the base
// dataset every client inherits unless its config overrides parts
// of it (see ClientConfig.catalog and resolveCatalog).
// ─────────────────────────────────────────────────────────────
import {
  clientFeedback,
  companyProjects,
  faqs,
  megaMenu,
  storefrontProducts,
  storefrontVideos,
} from "@/data/storefront";
import { catalogCategories } from "@/data/categories";
import { products } from "@/data/products";
import type { ClientCatalog } from "./types";

export const baseCatalog: ClientCatalog = {
  megaMenu,
  storefrontProducts,
  storefrontVideos,
  companyProjects,
  clientFeedback,
  faqs,
  catalogCategories,
  products,
};

/**
 * Merge a client's partial catalog override on top of the base catalog.
 * Used both server-side (generateStaticParams, server pages) and to seed
 * the client context provider.
 */
export function resolveCatalog(
  override?: Partial<ClientCatalog>,
): ClientCatalog {
  if (!override) return baseCatalog;
  return { ...baseCatalog, ...override };
}
