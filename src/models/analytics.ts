export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percentage";
  delta: number;
  trend: "up" | "down" | "flat";
}

export interface TimeSeriesPoint {
  label: string;
  revenue: number;
  orders: number;
  inquiries: number;
  stockTurnover: number;
}

export interface CategoryPerformance {
  category: string;
  revenue: number;
  margin: number;
  units: number;
}

export interface PipelineStage {
  stage: string;
  value: number;
  count: number;
}
