export type Severity = "normal" | "medium" | "high";

export interface WeekData {
  id: string;
  week: string;
  weekLabel: string;
  dateRange: string;
  riskScore: number;
  severity: Severity;
  anomaliesDetected: number;
  eventsProcessed: number;
  lastUpdated: string;
}

export interface AnomalyDetail {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: Severity;
  metric: string;
  baselineValue: number;
  currentValue: number;
  deviation: number;
  unit: string;
}

export interface WeekDetail extends WeekData {
  anomalies: AnomalyDetail[];
  baselineComparison: {
    metric: string;
    baseline: number;
    current: number;
    unit: string;
    status: "normal" | "elevated" | "critical";
  }[];
  explanation: string[];
}

export const weeksData: WeekData[] = [
  {
    id: "2026-W05",
    week: "W05",
    weekLabel: "Week 5, 2026",
    dateRange: "Jan 27 - Feb 2",
    riskScore: 23,
    severity: "normal",
    anomaliesDetected: 3,
    eventsProcessed: 1247832,
    lastUpdated: "Feb 1, 2026 09:00 UTC",
  },
  {
    id: "2026-W04",
    week: "W04",
    weekLabel: "Week 4, 2026",
    dateRange: "Jan 20 - Jan 26",
    riskScore: 22,
    severity: "normal",
    anomaliesDetected: 2,
    eventsProcessed: 1189456,
    lastUpdated: "Jan 26, 2026 09:00 UTC",
  },
  {
    id: "2026-W03",
    week: "W03",
    weekLabel: "Week 3, 2026",
    dateRange: "Jan 13 - Jan 19",
    riskScore: 28,
    severity: "normal",
    anomaliesDetected: 3,
    eventsProcessed: 1312789,
    lastUpdated: "Jan 19, 2026 09:00 UTC",
  },
  {
    id: "2026-W02",
    week: "W02",
    weekLabel: "Week 2, 2026",
    dateRange: "Jan 6 - Jan 12",
    riskScore: 38,
    severity: "medium",
    anomaliesDetected: 5,
    eventsProcessed: 1456123,
    lastUpdated: "Jan 12, 2026 09:00 UTC",
  },
  {
    id: "2026-W01",
    week: "W01",
    weekLabel: "Week 1, 2026",
    dateRange: "Dec 30 - Jan 5",
    riskScore: 62,
    severity: "medium",
    anomaliesDetected: 12,
    eventsProcessed: 1678234,
    lastUpdated: "Jan 5, 2026 09:00 UTC",
  },
  {
    id: "2025-W52",
    week: "W52",
    weekLabel: "Week 52, 2025",
    dateRange: "Dec 23 - Dec 29",
    riskScore: 45,
    severity: "medium",
    anomaliesDetected: 8,
    eventsProcessed: 987654,
    lastUpdated: "Dec 29, 2025 09:00 UTC",
  },
  {
    id: "2025-W51",
    week: "W51",
    weekLabel: "Week 51, 2025",
    dateRange: "Dec 16 - Dec 22",
    riskScore: 25,
    severity: "normal",
    anomaliesDetected: 4,
    eventsProcessed: 1234567,
    lastUpdated: "Dec 22, 2025 09:00 UTC",
  },
  {
    id: "2025-W50",
    week: "W50",
    weekLabel: "Week 50, 2025",
    dateRange: "Dec 9 - Dec 15",
    riskScore: 18,
    severity: "normal",
    anomaliesDetected: 2,
    eventsProcessed: 1123456,
    lastUpdated: "Dec 15, 2025 09:00 UTC",
  },
];

export const weekDetails: Record<string, WeekDetail> = {
  "2026-W01": {
    ...weeksData.find((w) => w.id === "2026-W01")!,
    anomalies: [
      {
        id: "anom_001",
        type: "authentication",
        title: "Failed Login Spike",
        description: "Unusual increase in failed authentication attempts across multiple user accounts",
        severity: "high",
        metric: "failed_logins",
        baselineValue: 145,
        currentValue: 892,
        deviation: 515,
        unit: "attempts",
      },
      {
        id: "anom_002",
        type: "network",
        title: "Outbound Traffic Anomaly",
        description: "Significant increase in outbound data transfer during non-business hours",
        severity: "medium",
        metric: "outbound_traffic",
        baselineValue: 2.4,
        currentValue: 8.7,
        deviation: 262,
        unit: "GB",
      },
      {
        id: "anom_003",
        type: "access",
        title: "New Geographic Access",
        description: "Login attempts detected from previously unseen geographic locations",
        severity: "medium",
        metric: "geo_locations",
        baselineValue: 3,
        currentValue: 7,
        deviation: 133,
        unit: "locations",
      },
    ],
    baselineComparison: [
      { metric: "Failed Logins", baseline: 145, current: 892, unit: "attempts", status: "critical" },
      { metric: "Outbound Traffic", baseline: 2.4, current: 8.7, unit: "GB", status: "elevated" },
      { metric: "Active Sessions", baseline: 234, current: 289, unit: "sessions", status: "normal" },
      { metric: "API Calls", baseline: 45678, current: 52341, unit: "calls", status: "normal" },
      { metric: "Unique IPs", baseline: 156, current: 187, unit: "IPs", status: "elevated" },
      { metric: "Alert Count", baseline: 12, current: 34, unit: "alerts", status: "elevated" },
    ],
    explanation: [
      "Failed login attempts increased by 515% compared to the 4-week baseline average, concentrated between 2:00-4:00 AM UTC",
      "Outbound data transfer exceeded normal thresholds by 262%, with unusual destination patterns detected",
      "4 new geographic locations observed in authentication logs, including 2 flagged regions",
      "The combination of authentication anomalies and network behavior triggered elevated risk scoring",
      "No confirmed breach indicators, but manual review recommended for affected accounts",
    ],
  },
  "2026-W05": {
    ...weeksData.find((w) => w.id === "2026-W05")!,
    anomalies: [
      {
        id: "anom_004",
        type: "access",
        title: "Minor Login Pattern Shift",
        description: "Slight variation in typical login times for 3 user accounts",
        severity: "normal",
        metric: "login_timing",
        baselineValue: 8,
        currentValue: 6,
        deviation: 25,
        unit: "hours avg",
      },
    ],
    baselineComparison: [
      { metric: "Failed Logins", baseline: 145, current: 152, unit: "attempts", status: "normal" },
      { metric: "Outbound Traffic", baseline: 2.4, current: 2.6, unit: "GB", status: "normal" },
      { metric: "Active Sessions", baseline: 234, current: 241, unit: "sessions", status: "normal" },
      { metric: "API Calls", baseline: 45678, current: 47123, unit: "calls", status: "normal" },
      { metric: "Unique IPs", baseline: 156, current: 159, unit: "IPs", status: "normal" },
      { metric: "Alert Count", baseline: 12, current: 14, unit: "alerts", status: "normal" },
    ],
    explanation: [
      "All metrics within normal operating parameters for this analysis period",
      "Minor variations detected are within expected thresholds",
      "No anomalous behavior patterns identified requiring attention",
    ],
  },
};

export const metricTrendData = {
  failed_logins: [
    { week: "W50", baseline: 145, current: 132, baselineLow: 120, baselineHigh: 170 },
    { week: "W51", baseline: 145, current: 156, baselineLow: 120, baselineHigh: 170 },
    { week: "W52", baseline: 145, current: 312, baselineLow: 120, baselineHigh: 170 },
    { week: "W01", baseline: 145, current: 892, baselineLow: 120, baselineHigh: 170 },
    { week: "W02", baseline: 145, current: 234, baselineLow: 120, baselineHigh: 170 },
    { week: "W03", baseline: 145, current: 167, baselineLow: 120, baselineHigh: 170 },
    { week: "W04", baseline: 145, current: 148, baselineLow: 120, baselineHigh: 170 },
    { week: "W05", baseline: 145, current: 152, baselineLow: 120, baselineHigh: 170 },
  ],
  outbound_traffic: [
    { week: "W50", baseline: 2.4, current: 2.2, baselineLow: 1.8, baselineHigh: 3.0 },
    { week: "W51", baseline: 2.4, current: 2.5, baselineLow: 1.8, baselineHigh: 3.0 },
    { week: "W52", baseline: 2.4, current: 4.2, baselineLow: 1.8, baselineHigh: 3.0 },
    { week: "W01", baseline: 2.4, current: 8.7, baselineLow: 1.8, baselineHigh: 3.0 },
    { week: "W02", baseline: 2.4, current: 3.1, baselineLow: 1.8, baselineHigh: 3.0 },
    { week: "W03", baseline: 2.4, current: 2.6, baselineLow: 1.8, baselineHigh: 3.0 },
    { week: "W04", baseline: 2.4, current: 2.3, baselineLow: 1.8, baselineHigh: 3.0 },
    { week: "W05", baseline: 2.4, current: 2.6, baselineLow: 1.8, baselineHigh: 3.0 },
  ],
  alert_count: [
    { week: "W50", baseline: 12, current: 10, baselineLow: 8, baselineHigh: 18 },
    { week: "W51", baseline: 12, current: 14, baselineLow: 8, baselineHigh: 18 },
    { week: "W52", baseline: 12, current: 22, baselineLow: 8, baselineHigh: 18 },
    { week: "W01", baseline: 12, current: 34, baselineLow: 8, baselineHigh: 18 },
    { week: "W02", baseline: 12, current: 19, baselineLow: 8, baselineHigh: 18 },
    { week: "W03", baseline: 12, current: 15, baselineLow: 8, baselineHigh: 18 },
    { week: "W04", baseline: 12, current: 11, baselineLow: 8, baselineHigh: 18 },
    { week: "W05", baseline: 12, current: 14, baselineLow: 8, baselineHigh: 18 },
  ],
};

export const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/v1/analysis/current",
    description: "Get the current week's analysis summary",
  },
  {
    method: "GET",
    endpoint: "/api/v1/analysis/weeks",
    description: "List all available weekly analysis reports",
  },
  {
    method: "GET",
    endpoint: "/api/v1/analysis/weeks/{weekId}",
    description: "Get detailed analysis for a specific week",
  },
  {
    method: "GET",
    endpoint: "/api/v1/anomalies",
    description: "List all detected anomalies with filters",
  },
  {
    method: "GET",
    endpoint: "/api/v1/metrics/{metricName}/trend",
    description: "Get metric trend data across weeks",
  },
  {
    method: "POST",
    endpoint: "/api/v1/webhooks",
    description: "Configure webhook notifications for alerts",
  },
];
