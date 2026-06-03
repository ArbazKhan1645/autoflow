import type {
  ClientCatalog,
  ClientConfig,
  ClientFeature,
  ClientStat,
  ClientTheme,
} from "./types";

// ─────────────────────────────────────────────────────────────
// defineClient — small helper so each client file only declares what is
// unique (identity, contact, brand colors, currency). Logo paths, social,
// SEO, stats, features and trust badges are derived/defaulted from the slug
// and copy. Override any of them by passing the field explicitly.
// ─────────────────────────────────────────────────────────────

const DEFAULT_STATS: ClientStat[] = [
  { value: "Fast", label: "local dispatch" },
  { value: "Genuine", label: "& quality parts" },
  { value: "Fitment", label: "checked" },
  { value: "Trusted", label: "local store" },
];

const DEFAULT_FEATURES: ClientFeature[] = [
  {
    title: "Fitment-first support",
    description:
      "We confirm your vehicle make, model and year before the order is processed.",
  },
  {
    title: "Genuine & quality stock",
    description:
      "Original and quality-graded aftermarket parts, clearly labelled so you know what you buy.",
  },
  {
    title: "Fast dispatch workflow",
    description:
      "Stock, packing and shipping are handled through a structured operational flow.",
  },
  {
    title: "Workshop & fleet ready",
    description:
      "Bulk pricing, repeat ordering and clean documentation for garages and trade buyers.",
  },
];

const THEME_DEFAULTS: Omit<ClientTheme, "primary" | "accent"> = {
  primaryForeground: "#ffffff",
  accentForeground: "#0b0b0b",
  background: "#ffffff",
  foreground: "#0f172a",
  surface: "#ffffff",
  surfaceMuted: "#f1f5f9",
  border: "rgba(15, 23, 42, 0.1)",
  radius: "0.5rem",
};

interface ClientInput {
  slug: string;
  storeName: string;
  storeTagline: string;
  storeDescription: string;
  storeSlogan: string;
  contact: ClientConfig["contact"];
  // Only primary + accent are required; the rest of the theme is defaulted.
  theme: Pick<ClientTheme, "primary" | "accent"> & Partial<ClientTheme>;
  currency: ClientConfig["currency"];
  seo?: Partial<ClientConfig["seo"]>;
  social?: Partial<ClientConfig["social"]>;
  stats?: ClientStat[];
  features?: ClientFeature[];
  trustBadges?: string[];
  catalog?: Partial<ClientCatalog>;
}

export function defineClient(input: ClientInput): ClientConfig {
  const config: ClientConfig = {
    slug: input.slug,
    storeName: input.storeName,
    storeTagline: input.storeTagline,
    storeDescription: input.storeDescription,
    storeSlogan: input.storeSlogan,

    logoMarkPath: `/brand/${input.slug}/mark.png`,
    logoFullPath: `/brand/${input.slug}/logo.png`,
    faviconPath: `/brand/${input.slug}/favicon.ico`,

    contact: input.contact,

    social: {
      facebook: "",
      instagram: "",
      whatsapp: "",
      twitter: "",
      ...input.social,
    },

    theme: { ...THEME_DEFAULTS, ...input.theme },

    currency: input.currency,

    seo: {
      title: `${input.storeName} | Auto Parts & Accessories`,
      description: input.storeDescription,
      keywords: `${input.storeName}, auto parts, car accessories, fitment, vehicle parts`,
      ogImage: `/brand/${input.slug}/og-image.png`,
      ...input.seo,
    },

    trustBadges:
      input.trustBadges ?? ["Fitment checked", "Fast dispatch", "Trusted local store"],
    stats: input.stats ?? DEFAULT_STATS,
    features: input.features ?? DEFAULT_FEATURES,
  };

  if (input.catalog) config.catalog = input.catalog;

  return config;
}
