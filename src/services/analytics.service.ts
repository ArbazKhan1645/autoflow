import {
  categoryPerformance,
  dashboardMetrics,
  pipelineStages,
  timeSeries,
} from "@/data/analytics";
import { mockApi } from "./mock-api";

export const analyticsService = {
  async overview() {
    return mockApi({
      metrics: dashboardMetrics,
      timeSeries,
      categoryPerformance,
      pipelineStages,
    });
  },
};
