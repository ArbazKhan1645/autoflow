import type {
  MegaMenuGroup,
  StorefrontProduct,
  StorefrontVideo,
} from "@/data/storefront";
import type { CatalogCategory } from "@/data/categories";
import type { Product } from "@/models/product";

// ─────────────────────────────────────────────────────────────
// Per-client catalog override.
// Anything omitted falls back to the shared base catalog
// (see ./_base-catalog.ts). This lets each client ship its own
// products/menu without copying everything.
// ─────────────────────────────────────────────────────────────
export interface ClientCatalog {
  megaMenu: MegaMenuGroup[];
  storefrontProducts: StorefrontProduct[];
  storefrontVideos: StorefrontVideo[];
  companyProjects: typeof import("@/data/storefront")["companyProjects"];
  clientFeedback: typeof import("@/data/storefront")["clientFeedback"];
  faqs: typeof import("@/data/storefront")["faqs"];
  catalogCategories: CatalogCategory[];
  products: Product[];
}

export interface ClientTheme {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  radius: string;
}

export interface ClientStat {
  value: string;
  label: string;
}

export interface ClientFeature {
  title: string;
  description: string;
}

export interface ClientConfig {
  // ── Identity ──────────────────────────────────────────────
  slug: string;
  storeName: string;
  storeTagline: string;
  storeDescription: string;
  storeSlogan: string;

  // ── Branding assets (place files in /public/brand/<slug>/) ─
  logoMarkPath: string;
  logoFullPath: string;
  faviconPath: string;

  // ── Contact ───────────────────────────────────────────────
  contact: {
    address: string;
    phone: string;
    email: string;
    supportLabel: string;
  };

  // ── Social links (set to "" to hide) ──────────────────────
  social: {
    facebook: string;
    instagram: string;
    whatsapp: string;
    twitter: string;
  };

  // ── Theme colors (injected as CSS variables) ──────────────
  theme: ClientTheme;

  // ── Currency & locale ─────────────────────────────────────
  currency: {
    symbol: string;
    code: string;
    locale: string;
  };

  // ── SEO / Meta ────────────────────────────────────────────
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };

  // ── Marketing content ─────────────────────────────────────
  trustBadges: string[];
  stats: ClientStat[];
  features: ClientFeature[];

  // ── Optional per-client catalog override ──────────────────
  catalog?: Partial<ClientCatalog>;
}
