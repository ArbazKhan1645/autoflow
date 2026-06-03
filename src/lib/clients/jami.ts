import { defineClient } from "./_defaults";

// Lead: JAMI Auto Parts (Laverton North VIC, AU) — 4.1★, 227 reviews, ships
// internationally, sells mostly via eBay/Gumtree today. URL: /jami/
export const jami = defineClient({
  slug: "jami",
  storeName: "JAMI Auto Parts",
  storeTagline: "Parts that ship worldwide",
  storeDescription:
    "Melbourne-based auto parts with a loyal following and international delivery — now on a proper branded storefront with fitment and ordering.",
  storeSlogan: "From our shelves to your driveway, anywhere.",
  contact: {
    address: "17 Little Boundary Rd, Laverton North VIC 3026, Australia",
    phone: "+61 3 9315 2600",
    email: "",
    supportLabel: "Retail, trade and international delivery",
  },
  theme: { primary: "#b91c1c", accent: "#f59e0b" },
  currency: { symbol: "$", code: "AUD", locale: "en-AU" },
  trustBadges: ["International delivery", "227+ reviews", "Fitment checked"],
});
