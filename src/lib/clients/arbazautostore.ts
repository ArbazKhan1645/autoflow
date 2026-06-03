import type { ClientConfig } from "./types";

// ─────────────────────────────────────────────────────────────
// Client: Arbaz Auto Store (example second client).
// URL: /arbazautostore/
// Copy this file to onboard a new client — see CLIENT_SETUP.md.
// ─────────────────────────────────────────────────────────────
export const arbazautostore: ClientConfig = {
  slug: "arbazautostore",

  storeName: "Arbaz Auto Store",
  storeTagline: "Trusted car parts & accessories",
  storeDescription:
    "Genuine and performance car parts, accessories, lighting and detailing supplies — sourced, fitment-checked and dispatched fast for drivers and workshops.",
  storeSlogan: "Quality parts, honest prices, quick delivery.",

  logoMarkPath: "/brand/arbazautostore/mark.png",
  logoFullPath: "/brand/arbazautostore/logo.png",
  faviconPath: "/brand/arbazautostore/favicon.ico",

  contact: {
    address: "Tariq Road, Karachi, Pakistan",
    phone: "+92 300 1234567",
    email: "support@arbazautostore.com",
    supportLabel: "Retail and workshop supply",
  },

  social: {
    facebook: "",
    instagram: "",
    whatsapp: "",
    twitter: "",
  },

  theme: {
    primary: "#b91c1c",
    primaryForeground: "#ffffff",
    accent: "#f59e0b",
    accentForeground: "#1a1203",
    background: "#fffaf7",
    foreground: "#1a1410",
    surface: "#ffffff",
    surfaceMuted: "#fdf1e7",
    border: "rgba(26, 20, 16, 0.1)",
    radius: "0.75rem",
  },

  currency: {
    symbol: "Rs",
    code: "PKR",
    locale: "en-PK",
  },

  seo: {
    title: "Arbaz Auto Store | Car Parts, Accessories & Fast Delivery",
    description:
      "Shop genuine and performance car parts, accessories, lighting and detailing supplies with fitment support and fast dispatch across Pakistan.",
    keywords:
      "car parts Karachi, auto accessories, car lighting, detailing supplies, workshop parts",
    ogImage: "/brand/arbazautostore/og-image.png",
  },

  trustBadges: ["Genuine parts", "Fitment checked", "Fast delivery"],

  stats: [
    { value: "8k+", label: "orders delivered" },
    { value: "4.8/5", label: "customer rating" },
    { value: "Same day", label: "city dispatch" },
    { value: "500+", label: "workshops served" },
  ],

  features: [
    {
      title: "Fitment-first support",
      description:
        "We confirm your car make, model and year before the order is processed.",
    },
    {
      title: "Genuine & graded stock",
      description:
        "Original and quality-graded aftermarket parts, clearly labelled so you know what you buy.",
    },
    {
      title: "Fast city dispatch",
      description:
        "In-city orders are packed and moved the same day through a tracked flow.",
    },
    {
      title: "Workshop friendly",
      description:
        "Bulk pricing, repeat ordering and clean invoices for garages and mechanics.",
    },
  ],

  // No catalog override → inherits the shared base catalog.
  // To ship a custom catalog, add e.g.:
  // catalog: { storefrontProducts: [...], megaMenu: [...] },
};
