import { defineClient } from "./_defaults";

// Lead: Action Car & Truck Accessories (Calgary, AB, Canada) — 4.1★, 301
// reviews. Tonneau covers, exhaust, remote starters, exterior accessories.
// URL: /actionaccessories/
export const actionaccessories = defineClient({
  slug: "actionaccessories",
  storeName: "Action Car & Truck Accessories",
  storeTagline: "Truck & exterior accessories",
  storeDescription:
    "Calgary's go-to for tonneau covers, exhaust, remote starters and exterior accessories — now on a standalone premium storefront.",
  storeSlogan: "Built for trucks, ready for the road.",
  contact: {
    address: "707 Barlow Trail SE, Calgary, AB T2E 8C2, Canada",
    phone: "+1 403-237-7660",
    email: "",
    supportLabel: "Truck and accessory specialists",
  },
  theme: { primary: "#ea580c", accent: "#111827", accentForeground: "#ffffff" },
  currency: { symbol: "$", code: "CAD", locale: "en-CA" },
  trustBadges: ["Truck specialists", "301+ reviews", "Fitment checked"],
});
