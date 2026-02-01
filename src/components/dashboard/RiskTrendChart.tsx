import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface WeekData {
  week: string;
  riskScore: number;
  anomalies: number;
}

interface RiskTrendChartProps {
  data: WeekData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card/95 backdrop-blur-sm p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Risk Score:{" "}
          <span className="font-mono font-medium text-foreground">
            {payload[0].value}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Anomalies:{" "}
          <span className="font-mono font-medium text-foreground">
            {payload[0].payload.anomalies}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function RiskTrendChart({ data }: RiskTrendChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Risk Score Trend</h3>
        <p className="text-sm text-muted-foreground">
          Weekly risk assessment over the past 8 weeks
        </p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(217, 33%, 17%)"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={70}
              stroke="hsl(0, 72%, 51%)"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
            />
            <ReferenceLine
              y={40}
              stroke="hsl(38, 92%, 50%)"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
            />
            <Area
              type="monotone"
              dataKey="riskScore"
              stroke="hsl(199, 89%, 48%)"
              strokeWidth={2}
              fill="url(#riskGradient)"
              dot={{
                fill: "hsl(222, 47%, 9%)",
                stroke: "hsl(199, 89%, 48%)",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                fill: "hsl(199, 89%, 48%)",
                stroke: "hsl(222, 47%, 9%)",
                strokeWidth: 2,
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-4 bg-risk-high/50" style={{ borderStyle: 'dashed' }} />
          <span>High Risk Threshold (70)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-4 bg-risk-medium/50" style={{ borderStyle: 'dashed' }} />
          <span>Medium Risk Threshold (40)</span>
        </div>
      </div>
    </div>
  );
}
