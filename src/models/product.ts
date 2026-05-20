export type ProductStatus =
  | "active"
  | "draft"
  | "archived"
  | "backorder"
  | "discontinued";

export type ProductCategory =
  | "Engine"
  | "Braking"
  | "Suspension"
  | "Electrical"
  | "Lighting"
  | "Body"
  | "Service"
  | "Performance";

export interface WarehouseStock {
  warehouseId: string;
  warehouseName: string;
  region: string;
  quantity: number;
  aisle: string;
  bin: string;
}

export interface PriceModifier {
  id: string;
  name: string;
  type: "discount" | "markup" | "fleet" | "export";
  value: number;
  valueType: "percentage" | "fixed";
}

export interface ProductTax {
  taxable: boolean;
  rate: number;
  taxCode: string;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: "cm" | "in";
}

export interface VehicleCompatibility {
  make: string;
  model: string;
  years: string;
  engine: string;
  trim?: string;
  notes?: string;
}

export interface ProductReviewSummary {
  score: number;
  highlights: string[];
}

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  productName: string;
  slug: string;
  category: ProductCategory;
  subCategory: string;
  brand: string;
  manufacturer: string;
  tags: string[];
  shortDescription: string;
  fullDescription: string;
  images: string[];
  thumbnail: string;
  stockQuantity: number;
  warehouseStock: WarehouseStock[];
  reservedStock: number;
  minimumStock: number;
  buyingPrice: number;
  basePrice: number;
  sellingPrice: number;
  discountPrice?: number;
  modifiers: PriceModifier[];
  tax: ProductTax;
  shippingWeight: number;
  dimensions: ProductDimensions;
  compatibility: string[];
  vehicleCompatibility: VehicleCompatibility[];
  rating: number;
  reviewsCount: number;
  reviewSummary: ProductReviewSummary;
  status: ProductStatus;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search?: string;
  category?: ProductCategory | "All";
  status?: ProductStatus | "all";
  featured?: boolean;
  lowStock?: boolean;
  sort?: "relevance" | "price-asc" | "price-desc" | "stock" | "rating";
}
