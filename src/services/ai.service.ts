import {
  aiInquiryInsights,
  aiMessages,
  aiRecommendations,
  callLogs,
  voiceAssistantSettings,
} from "@/data/ai";
import { mockApi } from "./mock-api";

export const aiService = {
  async console() {
    return mockApi({
      messages: aiMessages,
      recommendations: aiRecommendations,
      insights: aiInquiryInsights,
    });
  },

  async calling() {
    return mockApi({
      callLogs,
      settings: voiceAssistantSettings,
    });
  },
};
