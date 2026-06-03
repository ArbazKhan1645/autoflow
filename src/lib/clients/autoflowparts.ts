import type { ClientConfig } from "./types";

// ─────────────────────────────────────────────────────────────
// Client: AutoFlow Parts (the original brand).
// URL: /autoflowparts/
// ─────────────────────────────────────────────────────────────
export const autoflowparts: ClientConfig = {
  slug: "autoflowparts",

  storeName: "AutoFlow Parts",
  storeTagline: "Premium auto store",
  storeDescription:
    "Premium auto accessories, performance parts, lighting, detailing and export-ready fulfillment for retail customers, garages and fleets.",
  storeSlogan: "Upgrade every drive with parts that actually fit.",

  logoMarkPath: "/brand/autoflowparts/mark.png",
  logoFullPath: "/brand/autoflowparts/logo.png",
  faviconPath: "/brand/autoflowparts/favicon.ico",

  contact: {
    address: "Orangi town sector 4, Karachi, Pakistan",
    phone: "+92 310 2426676",
    email: "mashwanikhan192@gmail.com",
    supportLabel: "Retail, fleet and export dispatch",
  },

  social: {
    facebook: "",
    instagram: "",
    whatsapp: "",
    twitter: "",
  },

  theme: {
    primary: "#1769e0",
    primaryForeground: "#ffffff",
    accent: "#00a8cc",
    accentForeground: "#04121f",
    background: "#f7fbff",
    foreground: "#0d172a",
    surface: "#ffffff",
    surfaceMuted: "#edf6ff",
    border: "rgba(15, 23, 42, 0.1)",
    radius: "0.5rem",
  },

  currency: {
    symbol: "$",
    code: "USD",
    locale: "en-US",
  },

  seo: {
    title: "AutoFlow Parts | Auto Parts Inventory, Ordering and AI",
    description:
      "A premium automotive storefront for auto parts catalog, CRM, inventory, ordering, analytics and AI operations.",
    keywords:
      "auto parts CRM, inventory management, automotive SaaS, AI calling agent, parts catalog",
    ogImage: "/brand/autoflowparts/og-image.png",
  },

  trustBadges: ["Fitment checked", "Fast dispatch", "Export support"],

  stats: [
    { value: "12k+", label: "parts delivered" },
    { value: "4.9/5", label: "customer rating" },
    { value: "24h", label: "fast dispatch" },
    { value: "35+", label: "export lanes" },
  ],

  features: [
    {
      title: "Fitment-first support",
      description:
        "We verify vehicle year, model, trim and usage before your order moves forward.",
    },
    {
      title: "Premium stock curation",
      description:
        "Hot sellers, imported accessories and service parts are selected for real demand.",
    },
    {
      title: "Fast dispatch workflow",
      description:
        "Stock, packing and shipping are handled through a structured operational flow.",
    },
    {
      title: "Garage and fleet ready",
      description:
        "Bulk buyers get quote-ready items, repeat ordering and clean documentation.",
    },
  ],

  // No catalog override → inherits the shared base catalog.
};
