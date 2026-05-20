"use client";

import { create } from "zustand";
import type { StorefrontProduct } from "@/data/storefront";
import type { Product } from "@/models";

export interface CartLine {
  productId: string;
  sku: string;
  productName: string;
  thumbnail: string;
  unitPrice: number;
  quantity: number;
  warehouseId: string;
}

interface CartState {
  items: CartLine[];
  addItem: (product: Product, quantity?: number) => void;
  addStorefrontItem: (product: StorefrontProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((line) => line.productId === product.id);

      if (existing) {
        return {
          items: state.items.map((line) =>
            line.productId === product.id
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            productId: product.id,
            sku: product.sku,
            productName: product.productName,
            thumbnail: product.thumbnail,
            unitPrice: product.discountPrice ?? product.sellingPrice,
            quantity,
            warehouseId: product.warehouseStock[0]?.warehouseId ?? "unassigned",
          },
        ],
      };
    }),
  addStorefrontItem: (product, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((line) => line.productId === product.id);

      if (existing) {
        return {
          items: state.items.map((line) =>
            line.productId === product.id
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            productId: product.id,
            sku: product.id.toUpperCase(),
            productName: product.name,
            thumbnail: product.image,
            unitPrice: product.price,
            quantity,
            warehouseId: "online-store",
          },
        ],
      };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((line) =>
          line.productId === productId
            ? { ...line, quantity: Math.max(1, quantity) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((line) => line.productId !== productId),
    })),
  clear: () => set({ items: [] }),
}));

export function calculateCartTotals(items: CartLine[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const tax = subtotal * 0.0825;
  const shipping = items.length > 0 ? 48 : 0;

  return {
    subtotal,
    tax,
    shipping,
    total: subtotal + tax + shipping,
  };
}
