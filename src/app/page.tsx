import { notFound, redirect } from "next/navigation";
import { SINGLE_CLIENT_SLUG } from "@/lib/clients";

// The bare root reveals nothing — every real storefront lives under a client
// slug (/<client>/...). Hitting "/" renders the neutral 404 so clients cannot
// tell that other clients exist.
//
// Exception: in `next dev` single-client mode, send "/" to the active client so
// the developer lands on the right site. (In the production single-client
// export the post-build step flattens that client onto "/" instead, so we keep
// notFound() there to avoid emitting a redirect during static export.)
export default function RootIndex() {
  if (SINGLE_CLIENT_SLUG && process.env.NODE_ENV !== "production") {
    redirect(`/${SINGLE_CLIENT_SLUG}`);
  }
  notFound();
}
