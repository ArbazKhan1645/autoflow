import { APP_CONFIG } from "@/constants/app";
import { orders } from "@/data/orders";
import type { Order, OrderProductLine, OrderStatus, PaymentStatus } from "@/models";
import { createMockId, mockApi } from "./mock-api";

export interface DraftOrderPayload {
  customerInfo: Order["customerInfo"];
  products: OrderProductLine[];
  notes?: string;
}

export const orderService = {
  async list(filters?: {
    status?: OrderStatus | "all";
    paymentStatus?: PaymentStatus | "all";
    search?: string;
  }) {
    let rows = [...orders];

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      rows = rows.filter((order) =>
        [
          order.orderId,
          order.customerInfo.fullName,
          order.customerInfo.company,
          order.products.map((product) => product.productName).join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }

    if (filters?.status && filters.status !== "all") {
      rows = rows.filter((order) => order.orderStatus === filters.status);
    }

    if (filters?.paymentStatus && filters.paymentStatus !== "all") {
      rows = rows.filter((order) => order.paymentStatus === filters.paymentStatus);
    }

    return mockApi(rows);
  },

  async createDraft(payload: DraftOrderPayload) {
    const subtotal = payload.products.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0,
    );
    const tax = subtotal * APP_CONFIG.taxRate;
    const shipping = APP_CONFIG.defaultShipping;
    const now = new Date().toISOString();

    const draft: Order = {
      orderId: `ORD-${createMockId("draft").toUpperCase()}`,
      customerInfo: payload.customerInfo,
      products: payload.products,
      quantities: Object.fromEntries(
        payload.products.map((line) => [line.productId, line.quantity]),
      ),
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
      paymentStatus: "pending",
      orderStatus: "draft",
      trackingStatus: "awaiting-stock",
      invoice: {
        invoiceNumber: `INV-${createMockId("draft").toUpperCase()}`,
        issuedAt: now,
        dueAt: now,
        downloadUrl: "/mock/invoices/draft.pdf",
      },
      notes: payload.notes ?? "",
      createdAt: now,
      updatedAt: now,
    };

    return mockApi(draft, 420);
  },
};
