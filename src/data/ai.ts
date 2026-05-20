import type {
  AiChatMessage,
  AiInquiryInsight,
  AiRecommendation,
  CallLog,
  VoiceAssistantSettings,
} from "@/models";

export const aiMessages: AiChatMessage[] = [
  {
    id: "msg-1",
    role: "assistant",
    content:
      "I found 3 compatible options for the 2022 Bronco lighting inquiry. LumaX LED has the best margin and fastest local fulfillment.",
    createdAt: "2026-05-20T06:12:00.000Z",
  },
  {
    id: "msg-2",
    role: "user",
    content: "Create a follow-up note for Coastal Collision and suggest a bundle.",
    createdAt: "2026-05-20T06:13:00.000Z",
  },
  {
    id: "msg-3",
    role: "assistant",
    content:
      "Bundle suggestion: 2 LumaX LED assemblies, 4 MirrorPro side mirrors, and priority handling. Estimated revenue is $1,461 with 44% gross margin.",
    createdAt: "2026-05-20T06:14:00.000Z",
  },
];

export const aiRecommendations: AiRecommendation[] = [
  {
    id: "rec-1",
    title: "Pair premium lighting with collision mirror assemblies",
    confidence: 92,
    reason:
      "Collision customers ordering headlights also buy heated mirrors within 10 days.",
    productIds: ["prd-ex-005", "prd-fx-006"],
    customerSegment: "Collision shops",
  },
  {
    id: "rec-2",
    title: "Move brake pad kits into fleet reorder campaigns",
    confidence: 88,
    reason: "Fleet buyers reorder brake kits on predictable maintenance cycles.",
    productIds: ["prd-bx-002", "prd-ax-001"],
    customerSegment: "Fleet maintenance",
  },
  {
    id: "rec-3",
    title: "Flag export alternator quotes for manual margin review",
    confidence: 81,
    reason: "Export orders contain heavier freight and core-return exceptions.",
    productIds: ["prd-dx-004", "prd-hx-008"],
    customerSegment: "Export buyers",
  },
];

export const aiInquiryInsights: AiInquiryInsight[] = [
  {
    id: "ins-1",
    inquiry: "Need front lights for 2022 Bronco, insurance quote required.",
    detectedVehicle: "Ford Bronco 2022",
    recommendedAction: "Quote LumaX LED Headlamp Assembly with insurer note.",
    urgency: "high",
    createdAt: "2026-05-20T05:42:00.000Z",
  },
  {
    id: "ins-2",
    inquiry: "Dubai buyer needs mixed European alternator container.",
    detectedVehicle: "BMW 330i and Mercedes C300 mix",
    recommendedAction: "Prepare export quote with AmpCore core return exclusion.",
    urgency: "medium",
    createdAt: "2026-05-20T05:10:00.000Z",
  },
  {
    id: "ins-3",
    inquiry: "Monthly service bay oil packs for 12 lifts.",
    detectedVehicle: "Multi-vehicle service bay",
    recommendedAction: "Offer PureDrive recurring plan and pallet freight.",
    urgency: "low",
    createdAt: "2026-05-19T16:30:00.000Z",
  },
];

export const callLogs: CallLog[] = [
  {
    id: "call-1",
    customerName: "Mason Rivera",
    phone: "+1 214 555 0190",
    intent: "Fleet brake quote confirmation",
    outcome: "quoted",
    sentiment: "positive",
    durationSeconds: 328,
    transcriptSummary:
      "Confirmed 48 brake kits, asked for delivery before Friday maintenance route.",
    createdAt: "2026-05-19T17:30:00.000Z",
  },
  {
    id: "call-2",
    customerName: "Sophia Bennett",
    phone: "+1 310 555 0116",
    intent: "Insurance approval follow-up",
    outcome: "scheduled",
    sentiment: "neutral",
    durationSeconds: 214,
    transcriptSummary:
      "Customer is waiting for insurer approval and requested a reminder today.",
    createdAt: "2026-05-20T04:22:00.000Z",
  },
  {
    id: "call-3",
    customerName: "Ethan Cole",
    phone: "+1 646 555 0122",
    intent: "Oil service pack reorder",
    outcome: "resolved",
    sentiment: "positive",
    durationSeconds: 176,
    transcriptSummary:
      "Recurring order cadence confirmed. Customer wants loyalty pricing review.",
    createdAt: "2026-05-19T11:05:00.000Z",
  },
];

export const voiceAssistantSettings: VoiceAssistantSettings = {
  agentName: "Ava AI",
  language: "English",
  timezone: "America/Chicago",
  greeting:
    "Thanks for calling AutoFlow Parts. I can help check stock, compatibility, quotes and order status.",
  escalationPhone: "+1 214 555 0100",
  maxCallDurationMinutes: 12,
  autoFollowUpEnabled: true,
};
