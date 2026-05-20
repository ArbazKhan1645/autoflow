export interface AiChatMessage {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
  createdAt: string;
}

export interface AiRecommendation {
  id: string;
  title: string;
  confidence: number;
  reason: string;
  productIds: string[];
  customerSegment: string;
}

export interface AiInquiryInsight {
  id: string;
  inquiry: string;
  detectedVehicle: string;
  recommendedAction: string;
  urgency: "low" | "medium" | "high";
  createdAt: string;
}

export interface CallLog {
  id: string;
  customerName: string;
  phone: string;
  intent: string;
  outcome: "scheduled" | "quoted" | "missed" | "transferred" | "resolved";
  sentiment: "positive" | "neutral" | "negative";
  durationSeconds: number;
  transcriptSummary: string;
  createdAt: string;
}

export interface VoiceAssistantSettings {
  agentName: string;
  language: string;
  timezone: string;
  greeting: string;
  escalationPhone: string;
  maxCallDurationMinutes: number;
  autoFollowUpEnabled: boolean;
}
