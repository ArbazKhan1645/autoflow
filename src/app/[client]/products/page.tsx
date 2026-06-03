import { Suspense } from "react";
import { ProductsScreen } from "@/features/storefront/products-screen";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsScreen />
    </Suspense>
  );
}
