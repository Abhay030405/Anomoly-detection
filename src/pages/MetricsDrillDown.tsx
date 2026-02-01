import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { TrendingUp, AlertTriangle, Info } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { metricTrendData } from "@/lib/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const metricOptions = [
  {
    value: "failed_logins",
    label: "Failed Logins",
    unit: "attempts",
    description:
      "Authentication failures spiked dramatically during Week 1, with 892 attempts compared to a baseline of 145. The spike was concentrated during off-hours (2:00-4:00 AM UTC), suggesting potential brute-force activity. Values have since normalized to baseline levels.",
  },
  {
    value: "outbound_traffic",
    label: "Outbound Traffic",
    unit: "GB",
    description:
      "Data transfer volumes exceeded normal thresholds by 262% during Week 1, reaching 8.7 GB compared to the 2.4 GB baseline. Traffic patterns indicated unusual destination IPs. Current levels have returned to expected ranges.",
  },
  {
    value: "alert_count",
    label: "Alert Count",
    unit: "alerts",
    description:
      "Security alerts nearly tripled during Week 1, with 34 alerts versus the baseline of 12. The majority were related to authentication anomalies and network behavior. Alert frequency has stabilized in recent weeks.",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isAnomaly = data.current > data.baselineHigh;

    return (
      <div className="rounded-lg border border-border bg-card/95 backdrop-blur-sm p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Current</span>
            <span className={`font-mono font-medium ${isAnomaly ? "text-risk-high" : "text-foreground"}`}>
              {data.current}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Baseline</span>
            <span className="font-mono text-primary">{data.baseline}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Range</span>
            <span className="font-mono text-muted-foreground">
              {data.baselineLow} - {data.baselineHigh}
            </span>
          </div>
        </div>
        {isAnomaly && (
          <div className="mt-2 pt-2 border-t border-border flex items-center gap-1 text-risk-high text-xs">
            <AlertTriangle className="h-3 w-3" />
            Exceeds baseline threshold
          </div>
        )}
      </div>
    );
  }
  return null;
};

const MetricsDrillDown = () => {
  const [selectedMetric, setSelectedMetric] = useState("failed_logins");
  const data = metricTrendData[selectedMetric as keyof typeof metricTrendData];
  const metricInfo = metricOptions.find((m) => m.value === selectedMetric)!;

  const maxValue = Math.max(...data.map((d) => Math.max(d.current, d.baselineHigh)));
  const anomalyWeeks = data.filter((d) => d.current > d.baselineHigh);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Metric Analysis</h1>
            <p className="mt-1 text-muted-foreground">
              Deep-dive into security metrics with baseline comparison
            </p>
          </div>

          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[200px] bg-card border-border">
              <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {metricOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Baseline Average</p>
            <p className="mt-1 text-2xl font-semibold font-mono">
              {data[0].baseline} <span className="text-sm text-muted-foreground">{metricInfo.unit}</span>
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Current Week</p>
            <p className="mt-1 text-2xl font-semibold font-mono">
              {data[data.length - 1].current}{" "}
              <span className="text-sm text-muted-foreground">{metricInfo.unit}</span>
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Peak Value</p>
            <p className="mt-1 text-2xl font-semibold font-mono text-risk-high">
              {Math.max(...data.map((d) => d.current))}{" "}
              <span className="text-sm text-muted-foreground">{metricInfo.unit}</span>
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Anomaly Weeks</p>
            <p className="mt-1 text-2xl font-semibold font-mono">{anomalyWeeks.length}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">{metricInfo.label} Trend</h2>
            <p className="text-sm text-muted-foreground">
              8-week trend with baseline range highlighted
            </p>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" vertical={false} />
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  domain={[0, maxValue * 1.1]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />

                {/* Baseline range area */}
                <Area
                  type="monotone"
                  dataKey="baselineHigh"
                  stroke="none"
                  fill="url(#baselineGradient)"
                  fillOpacity={1}
                />

                {/* Baseline reference line */}
                <ReferenceLine
                  y={data[0].baseline}
                  stroke="hsl(142, 71%, 45%)"
                  strokeDasharray="4 4"
                  strokeOpacity={0.7}
                />

                {/* Upper threshold line */}
                <ReferenceLine
                  y={data[0].baselineHigh}
                  stroke="hsl(38, 92%, 50%)"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                />

                {/* Current values */}
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="hsl(199, 89%, 48%)"
                  strokeWidth={2}
                  fill="url(#currentGradient)"
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    const isAnomaly = payload.current > payload.baselineHigh;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isAnomaly ? 6 : 4}
                        fill={isAnomaly ? "hsl(0, 72%, 51%)" : "hsl(222, 47%, 9%)"}
                        stroke={isAnomaly ? "hsl(0, 72%, 51%)" : "hsl(199, 89%, 48%)"}
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-primary bg-background" />
              <span>Current Value</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-risk-high" />
              <span>Anomaly Detected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-4 bg-risk-normal/20" />
              <span>Baseline Range</span>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Analysis Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metricInfo.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MetricsDrillDown;
