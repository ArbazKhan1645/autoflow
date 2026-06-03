import { defineClient } from "./_defaults";

// Lead: ARA Auto Accessories Inc. (Calgary, AB, Canada) — 4.6★, 442 reviews.
// Remote starters, audio, car accessories; no polished storefront.
// URL: /ara/
export const ara = defineClient({
  slug: "ara",
  storeName: "ARA Auto Accessories",
  storeTagline: "Remote starters & car audio",
  storeDescription:
    "Calgary specialists in remote starters, car audio and accessories — a strong service reputation, now matched with a professional online catalog.",
  storeSlogan: "Start it, sound it, accessorize it.",
  contact: {
    address: "408 36 Ave SE, Calgary, AB T2G 1W4, Canada",
    phone: "+1 403-287-3130",
    email: "",
    supportLabel: "Install and accessory specialists",
  },
  theme: { primary: "#9f1239", accent: "#eab308" },
  currency: { symbol: "$", code: "CAD", locale: "en-CA" },
  trustBadges: ["442+ reviews", "Install experts", "Fitment checked"],
});
