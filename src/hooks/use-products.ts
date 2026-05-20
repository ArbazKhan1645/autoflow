"use client";

import { useQuery } from "@tanstack/react-query";
import type { ProductFilters } from "@/models";
import { productService } from "@/services/product.service";

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productService.list(filters),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useCatalogCategories() {
  return useQuery({
    queryKey: ["catalog-categories"],
    queryFn: () => productService.getCategories(),
  });
}
