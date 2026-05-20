export interface Warehouse {
  id: string;
  name: string;
  region: string;
  address: string;
  manager: string;
  capacityUsed: number;
  inboundShipments: number;
  outboundShipments: number;
}

export interface StockMovement {
  id: string;
  productId: string;
  sku: string;
  productName: string;
  type: "inbound" | "outbound" | "adjustment" | "reserved";
  warehouseId: string;
  quantity: number;
  reference: string;
  createdAt: string;
}

export interface LowStockAlert {
  id: string;
  productId: string;
  sku: string;
  productName: string;
  currentStock: number;
  minimumStock: number;
  severity: "low" | "critical";
  warehouseId: string;
  createdAt: string;
}
