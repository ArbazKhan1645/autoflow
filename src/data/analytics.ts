import type {
  CategoryPerformance,
  DashboardMetric,
  PipelineStage,
  TimeSeriesPoint,
} from "@/models";

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "m1",
    label: "Monthly revenue",
    value: 248600,
    format: "currency",
    delta: 18,
    trend: "up",
  },
  {
    id: "m2",
    label: "Open inquiries",
    value: 124,
    format: "number",
    delta: 12,
    trend: "up",
  },
  {
    id: "m3",
    label: "Gross margin",
    value: 42,
    format: "percentage",
    delta: 4,
    trend: "up",
  },
  {
    id: "m4",
    label: "Low stock SKUs",
    value: 18,
    format: "number",
    delta: -7,
    trend: "down",
  },
];

export const timeSeries: TimeSeriesPoint[] = [
  { label: "Jan", revenue: 172000, orders: 242, inquiries: 410, stockTurnover: 3.2 },
  { label: "Feb", revenue: 188000, orders: 268, inquiries: 438, stockTurnover: 3.5 },
  { label: "Mar", revenue: 196000, orders: 281, inquiries: 462, stockTurnover: 3.7 },
  { label: "Apr", revenue: 226000, orders: 316, inquiries: 505, stockTurnover: 4.0 },
  { label: "May", revenue: 248600, orders: 344, inquiries: 548, stockTurnover: 4.3 },
  { label: "Jun", revenue: 263000, orders: 361, inquiries: 575, stockTurnover: 4.5 },
];

export const categoryPerformance: CategoryPerformance[] = [
  { category: "Engine", revenue: 52600, margin: 48, units: 910 },
  { category: "Braking", revenue: 68400, margin: 44, units: 1180 },
  { category: "Lighting", revenue: 47600, margin: 41, units: 360 },
  { category: "Electrical", revenue: 39800, margin: 36, units: 220 },
  { category: "Service", revenue: 31200, margin: 32, units: 1640 },
  { category: "Performance", revenue: 29000, margin: 52, units: 88 },
];

export const pipelineStages: PipelineStage[] = [
  { stage: "New inquiry", value: 84200, count: 42 },
  { stage: "Quoted", value: 121400, count: 38 },
  { stage: "Follow-up", value: 66200, count: 21 },
  { stage: "Won", value: 174600, count: 29 },
];
