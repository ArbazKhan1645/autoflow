"use client";

import { useQuery } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventory.service";

export function useInventoryOverview() {
  return useQuery({
    queryKey: ["inventory-overview"],
    queryFn: () => inventoryService.overview(),
  });
}
