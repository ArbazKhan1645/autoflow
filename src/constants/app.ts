// Brand identity now lives per-client in src/lib/clients/*. APP_CONFIG keeps
// only tenant-agnostic operational defaults used by the mock API/services.
export const APP_CONFIG = {
  mockApiLatency: 220,
  taxRate: 0.0825,
  defaultShipping: 48,
} as const;

export const BUSINESS_CHANNELS = [
  "Walk-in Retail",
  "WhatsApp Sales",
  "Fleet Accounts",
  "Export Buyers",
  "Marketplace",
] as const;
