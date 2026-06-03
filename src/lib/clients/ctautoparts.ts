import { defineClient } from "./_defaults";

// Lead: CT AutoParts (Auckland, NZ) — 5.0★, 21 reviews. Premium lights &
// accessories, only a Google Business page today. URL: /ctautoparts/
export const ctautoparts = defineClient({
  slug: "ctautoparts",
  storeName: "CT AutoParts",
  storeTagline: "Premium lights & accessories",
  storeDescription:
    "Premium automotive lighting, accessories and styling parts for Auckland drivers — fitment-checked and dispatched fast across New Zealand.",
  storeSlogan: "Brighter drives start with the right parts.",
  contact: {
    address: "Unit 24/375 East Tamaki Rd, Auckland 2013, New Zealand",
    phone: "+64 21 763 716",
    email: "ctautoparts@gmail.com",
    supportLabel: "Retail and accessory fitment support",
  },
  theme: { primary: "#1d4ed8", accent: "#f59e0b" },
  currency: { symbol: "$", code: "NZD", locale: "en-NZ" },
});
