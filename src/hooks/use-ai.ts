"use client";

import { useQuery } from "@tanstack/react-query";
import { aiService } from "@/services/ai.service";

export function useAiConsole() {
  return useQuery({
    queryKey: ["ai-console"],
    queryFn: () => aiService.console(),
  });
}

export function useAiCalling() {
  return useQuery({
    queryKey: ["ai-calling"],
    queryFn: () => aiService.calling(),
  });
}
