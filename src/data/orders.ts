import type { Order } from "@/models";
import { products } from "./products";

const line = (productId: string, quantity: number, warehouseId: string) => {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    throw new Error(`Missing mock product ${productId}`);
  }

  return {
    productId: product.id,
    sku: product.sku,
    productName: product.productName,
    thumbnail: product.thumbnail,
    unitPrice: product.discountPrice ?? product.sellingPrice,
    quantity,
    warehouseId,
  };
};

export const orders: Order[] = [
  {
    orderId: "ORD-24018",
    customerInfo: {
      customerId: "cus-1001",
      fullName: "Mason Rivera",
      phone: "+1 214 555 0190",
      email: "mason@riverafleet.example",
      company: "Rivera Fleet Services",
      shippingAddress: "418 Commerce Lane, Dallas, TX",
    },
    products: [line("prd-bx-002", 48, "wh-dal"), line("prd-ax-001", 36, "wh-dal")],
    quantities: { "prd-bx-002": 48, "prd-ax-001": 36 },
    subtotal: 5816,
    tax: 479,
    shipping: 125,
    total: 6420,
    paymentStatus: "partial",
    orderStatus: "confirmed",
    trackingStatus: "ready",
    invoice: {
      invoiceNumber: "INV-2026-418",
      issuedAt: "2026-05-18T12:00:00.000Z",
      dueAt: "2026-06-02T12:00:00.000Z",
      downloadUrl: "/mock/invoices/INV-2026-418.pdf",
    },
    notes: "Deliver before Friday maintenance run.",
    createdAt: "2026-05-18T12:00:00.000Z",
    updatedAt: "2026-05-19T09:30:00.000Z",
  },
  {
    orderId: "ORD-24017",
    customerInfo: {
      customerId: "cus-1004",
      fullName: "Ethan Cole",
      phone: "+1 646 555 0122",
      email: "service@metrogarage.example",
      company: "Metro Garage",
      shippingAddress: "77 Union Street, Newark, NJ",
    },
    products: [line("prd-gx-007", 50, "wh-nj"), line("prd-cx-003", 6, "wh-nj")],
    quantities: { "prd-gx-007": 50, "prd-cx-003": 6 },
    subtotal: 3854,
    tax: 318,
    shipping: 94,
    total: 4266,
    paymentStatus: "paid",
    orderStatus: "shipped",
    trackingStatus: "in-transit",
    invoice: {
      invoiceNumber: "INV-2026-417",
      issuedAt: "2026-05-16T15:20:00.000Z",
      dueAt: "2026-05-16T15:20:00.000Z",
      downloadUrl: "/mock/invoices/INV-2026-417.pdf",
    },
    notes: "Recurring service pack order.",
    createdAt: "2026-05-16T15:20:00.000Z",
    updatedAt: "2026-05-17T08:30:00.000Z",
  },
  {
    orderId: "ORD-24016",
    customerInfo: {
      customerId: "cus-1003",
      fullName: "Omar Siddiqui",
      phone: "+971 50 555 8191",
      email: "omar@desertlineexports.example",
      company: "DesertLine Auto Exports",
      shippingAddress: "Jebel Ali Free Zone, Dubai",
    },
    products: [line("prd-dx-004", 24, "wh-nj"), line("prd-hx-008", 5, "wh-nj")],
    quantities: { "prd-dx-004": 24, "prd-hx-008": 5 },
    subtotal: 9998,
    tax: 0,
    shipping: 740,
    total: 10738,
    paymentStatus: "pending",
    orderStatus: "packed",
    trackingStatus: "ready",
    invoice: {
      invoiceNumber: "INV-2026-416",
      issuedAt: "2026-05-15T09:10:00.000Z",
      dueAt: "2026-05-22T09:10:00.000Z",
      downloadUrl: "/mock/invoices/INV-2026-416.pdf",
    },
    notes: "Export docs required with HS codes.",
    createdAt: "2026-05-15T09:10:00.000Z",
    updatedAt: "2026-05-18T07:48:00.000Z",
  },
  {
    orderId: "ORD-24013",
    customerInfo: {
      customerId: "cus-1002",
      fullName: "Sophia Bennett",
      phone: "+1 310 555 0116",
      email: "parts@coastalcollision.example",
      company: "Coastal Collision Center",
      shippingAddress: "902 Harbor Drive, Los Angeles, CA",
    },
    products: [line("prd-ex-005", 2, "wh-la"), line("prd-fx-006", 4, "wh-la")],
    quantities: { "prd-ex-005": 2, "prd-fx-006": 4 },
    subtotal: 1302,
    tax: 107,
    shipping: 52,
    total: 1461,
    paymentStatus: "paid",
    orderStatus: "delivered",
    trackingStatus: "delivered",
    invoice: {
      invoiceNumber: "INV-2026-413",
      issuedAt: "2026-05-10T12:05:00.000Z",
      dueAt: "2026-05-10T12:05:00.000Z",
      downloadUrl: "/mock/invoices/INV-2026-413.pdf",
    },
    notes: "Insurance claim repair.",
    createdAt: "2026-05-10T12:05:00.000Z",
    updatedAt: "2026-05-13T13:00:00.000Z",
  },
];
