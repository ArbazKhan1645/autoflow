"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";

export function useNotificationsQuery() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationService.list(),
  });
}
