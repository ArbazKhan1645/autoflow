import { defineClient } from "./_defaults";

// Lead: Kingsford Auto Spares (Maroubra NSW, AU) — est. 1988, 74 reviews,
// independent "Aladdin's cave" of parts, no website. URL: /kingsford/
export const kingsford = defineClient({
  slug: "kingsford",
  storeName: "Kingsford Auto Spares",
  storeTagline: "Spare parts since 1988",
  storeDescription:
    "An independent Sydney parts store trading since 1988 — a deep range of spares and accessories, now with online fitment checks and ordering.",
  storeSlogan: "Decades of parts knowledge, now online.",
  contact: {
    address: "272B Maroubra Rd, Maroubra NSW 2035, Australia",
    phone: "+61 2 9349 7044",
    email: "",
    supportLabel: "Open 7 days — retail and trade",
  },
  theme: { primary: "#166534", accent: "#ca8a04" },
  currency: { symbol: "$", code: "AUD", locale: "en-AU" },
  trustBadges: ["Est. 1988", "Open 7 days", "Independent store"],
});
