import { APP_CONFIG } from "@/constants/app";
import { stableClone, wait } from "@/lib/utils";

export async function mockApi<T>(
  data: T,
  latency: number = APP_CONFIG.mockApiLatency,
) {
  await wait(latency);
  return stableClone(data);
}

export function createMockId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
