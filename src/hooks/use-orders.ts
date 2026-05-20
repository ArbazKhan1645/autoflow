"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderStatus, PaymentStatus } from "@/models";
import { orderService, type DraftOrderPayload } from "@/services/order.service";

export function useOrders(filters?: {
  status?: OrderStatus | "all";
  paymentStatus?: PaymentStatus | "all";
  search?: string;
}) {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => orderService.list(filters),
  });
}

export function useCreateOrderDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DraftOrderPayload) => orderService.createDraft(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
