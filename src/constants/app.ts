export const APP_CONFIG = {
  name: "AutoFlow CRM",
  shortName: "AutoFlow",
  tagline: "Automotive parts operations, beautifully connected.",
  supportEmail: "support@autoflow.example",
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
