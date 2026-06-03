import { defineClient } from "./_defaults";

// Lead: ACE Auto Parts (Ōtāhuhu, Auckland, NZ) — est. 1996, 4.7★, 127 reviews,
// 2 branches, basic site (aceautoparts.co.nz). URL: /aceautoparts/
export const aceautoparts = defineClient({
  slug: "aceautoparts",
  storeName: "ACE Auto Parts",
  storeTagline: "Auckland & Hamilton branches",
  storeDescription:
    "A growing New Zealand parts brand with branches in Auckland and Hamilton — upgraded with fitment-first browsing, hot sellers and online ordering.",
  storeSlogan: "Two branches, one easy way to buy parts.",
  contact: {
    address: "39 Saleyards Rd, Ōtāhuhu, Auckland 1062, New Zealand",
    phone: "+64 9 270 0220",
    email: "info@aceautoparts.co.nz",
    supportLabel: "Auckland + Hamilton — retail and trade",
  },
  theme: { primary: "#1e3a8a", accent: "#dc2626", accentForeground: "#ffffff" },
  currency: { symbol: "$", code: "NZD", locale: "en-NZ" },
  trustBadges: ["Est. 1996", "2 branches", "4.7★ rated"],
});
