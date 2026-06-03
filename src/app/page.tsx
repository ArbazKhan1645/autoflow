import { notFound } from "next/navigation";

// The bare root reveals nothing — every real storefront lives under a
// client slug (/<client>/...). Hitting "/" renders the neutral 404 so
// clients cannot tell that other clients exist.
export default function RootIndex() {
  notFound();
}
