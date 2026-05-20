"use client";

import { useQuery } from "@tanstack/react-query";
import type { CustomerStatus } from "@/models";
import { customerService } from "@/services/customer.service";

export function useCustomers(filters?: {
  search?: string;
  status?: CustomerStatus | "all";
}) {
  return useQuery({
    queryKey: ["customers", filters],
    queryFn: () => customerService.list(filters),
  });
}
