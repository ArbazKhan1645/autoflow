import { lowStockAlerts, stockMovements, warehouses } from "@/data/inventory";
import { products } from "@/data/products";
import { mockApi } from "./mock-api";

export const inventoryService = {
  async overview() {
    return mockApi({
      warehouses,
      lowStockAlerts,
      stockMovements,
      totalStock: products.reduce((sum, product) => sum + product.stockQuantity, 0),
      reservedStock: products.reduce((sum, product) => sum + product.reservedStock, 0),
      lowStockCount: products.filter(
        (product) => product.stockQuantity <= product.minimumStock,
      ).length,
    });
  },
};
