import type { Product } from "./product";

export type PaymentStatus = "pending" | "paid" | "partial" | "refunded";
export type OrderStatus =
  | "draft"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";
export type TrackingStatus =
  | "awaiting-stock"
  | "ready"
  | "in-transit"
  | "delivered"
  | "exception";

export interface OrderCustomerInfo {
  customerId: string;
  fullName: string;
  phone: string;
  email: string;
  company: string;
  shippingAddress: string;
}

export interface OrderProductLine {
  productId: Product["id"];
  sku: Product["sku"];
  productName: Product["productName"];
  thumbnail: Product["thumbnail"];
  unitPrice: number;
  quantity: number;
  warehouseId: string;
}

export interface InvoiceInfo {
  invoiceNumber: string;
  issuedAt: string;
  dueAt: string;
  downloadUrl: string;
}

export interface Order {
  orderId: string;
  customerInfo: OrderCustomerInfo;
  products: OrderProductLine[];
  quantities: Record<string, number>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingStatus: TrackingStatus;
  invoice: InvoiceInfo;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
