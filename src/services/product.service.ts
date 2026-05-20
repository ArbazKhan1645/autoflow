import { catalogCategories } from "@/data/categories";
import { products } from "@/data/products";
import type { Product, ProductFilters } from "@/models";
import { mockApi } from "./mock-api";

function applyProductFilters(items: Product[], filters: ProductFilters = {}) {
  let filtered = [...items];

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter((product) =>
      [
        product.productName,
        product.sku,
        product.brand,
        product.manufacturer,
        product.category,
        product.subCategory,
        ...product.tags,
        ...product.compatibility,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  if (filters.category && filters.category !== "All") {
    filtered = filtered.filter((product) => product.category === filters.category);
  }

  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter((product) => product.status === filters.status);
  }

  if (filters.featured) {
    filtered = filtered.filter((product) => product.featured);
  }

  if (filters.lowStock) {
    filtered = filtered.filter(
      (product) => product.stockQuantity <= product.minimumStock,
    );
  }

  switch (filters.sort) {
    case "price-asc":
      filtered.sort((a, b) => a.sellingPrice - b.sellingPrice);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.sellingPrice - a.sellingPrice);
      break;
    case "stock":
      filtered.sort((a, b) => b.stockQuantity - a.stockQuantity);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return filtered;
}

export const productService = {
  async list(filters?: ProductFilters) {
    return mockApi(applyProductFilters(products, filters));
  },

  async getBySlug(slug: string) {
    return mockApi(products.find((product) => product.slug === slug) ?? null);
  },

  async getFeatured() {
    return mockApi(products.filter((product) => product.featured));
  },

  async getCategories() {
    return mockApi(catalogCategories);
  },
};
