import { defineClient } from "./_defaults";

// Lead: 1st Auto Parts Ltd (Māngere, Auckland, NZ) — 4.6★, 90 reviews, ships
// NZ-wide, minimal online presence today. URL: /firstautoparts/
export const firstautoparts = defineClient({
  slug: "firstautoparts",
  storeName: "1st Auto Parts",
  storeTagline: "NZ-wide parts delivery",
  storeDescription:
    "A trusted Auckland parts store shipping nationwide — strong on service and stock, now with an online catalog, fitment checks and ordering.",
  storeSlogan: "First call for the right part, first time.",
  contact: {
    address: "45 Rennie Drive, Māngere, Auckland 2022, New Zealand",
    phone: "+64 9 638 6439",
    email: "",
    supportLabel: "Ships NZ-wide — retail and trade",
  },
  theme: { primary: "#0f766e", accent: "#f59e0b" },
  currency: { symbol: "$", code: "NZD", locale: "en-NZ" },
  trustBadges: ["Ships NZ-wide", "4.6★ rated", "Fitment checked"],
});
