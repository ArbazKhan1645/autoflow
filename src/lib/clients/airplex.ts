import { defineClient } from "./_defaults";

// Lead: Airplex (Ōtāhuhu, Auckland, NZ) — 4.5★, 212 reviews. LED lights,
// window visors, roof racks; limited product pages (airplex.co.nz).
// URL: /airplex/
export const airplex = defineClient({
  slug: "airplex",
  storeName: "Airplex",
  storeTagline: "LED lighting & accessories",
  storeDescription:
    "Auckland specialists in LED lighting, window visors and roof racks — presented on a fitment-first storefront built for real product browsing.",
  storeSlogan: "Light it up, kit it out.",
  contact: {
    address: "21 Saleyards Rd, Ōtāhuhu, Auckland 1062, New Zealand",
    phone: "+64 800 247 753",
    email: "",
    supportLabel: "Lighting and accessory specialists",
  },
  theme: { primary: "#0e7490", accent: "#f59e0b" },
  currency: { symbol: "$", code: "NZD", locale: "en-NZ" },
  trustBadges: ["LED specialists", "212+ reviews", "Fitment checked"],
});
