import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
} from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { SeverityBadge } from "@/components/ui/SeverityBadge";
import { weekDetails, weeksData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const statusIcons = {
  normal: ShieldCheck,
  medium: Shield,
  high: ShieldAlert,
};

const comparisonStatusConfig = {
  normal: { label: "Within Range", className: "text-risk-normal", icon: Minus },
  elevated: { label: "Elevated", className: "text-risk-medium", icon: TrendingUp },
  critical: { label: "Critical", className: "text-risk-high", icon: TrendingUp },
};

const WeekDetail = () => {
  const { weekId } = useParams();
  const detail = weekDetails[weekId || ""] || weekDetails["2026-W01"];
  const weekData = weeksData.find((w) => w.id === weekId) || weeksData[4];

  const StatusIcon = statusIcons[detail.severity];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Back Navigation */}
        <Link
          to="/weekly-summary"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Weekly Summary
        </Link>

        {/* Risk Summary Header */}
        <div
          className={cn(
            "rounded-xl border p-6 mb-8",
            detail.severity === "normal" && "border-risk-normal/30 bg-risk-normal/5",
            detail.severity === "medium" && "border-risk-medium/30 bg-risk-medium/5",
            detail.severity === "high" && "border-risk-high/30 bg-risk-high/5"
          )}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "rounded-xl p-3",
                  detail.severity === "normal" && "bg-risk-normal/15",
                  detail.severity === "medium" && "bg-risk-medium/15",
                  detail.severity === "high" && "bg-risk-high/15"
                )}
              >
                <StatusIcon
                  className={cn(
                    "h-8 w-8",
                    detail.severity === "normal" && "text-risk-normal",
                    detail.severity === "medium" && "text-risk-medium",
                    detail.severity === "high" && "text-risk-high"
                  )}
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{detail.weekLabel}</h1>
                <p className="text-muted-foreground">{detail.dateRange}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p
                  className={cn(
                    "text-3xl font-bold font-mono",
                    detail.severity === "normal" && "text-risk-normal",
                    detail.severity === "medium" && "text-risk-medium",
                    detail.severity === "high" && "text-risk-high"
                  )}
                >
                  {detail.riskScore}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Severity</p>
                <div className="mt-1">
                  <SeverityBadge severity={detail.severity} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Anomalies</p>
                <p className="text-3xl font-bold font-mono">{detail.anomaliesDetected}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Explanation Panel */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Why This Week Was Flagged</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              AI-generated explanation of detected behavioral changes
            </p>
            <ul className="space-y-3">
              {detail.explanation.map((point, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      index === 0 ? "bg-risk-high" : "bg-muted-foreground"
                    )}
                  />
                  <span className="text-foreground/90 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Baseline Comparison */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Baseline vs Current Week</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Comparison against 4-week rolling baseline
            </p>
            <div className="space-y-3">
              {detail.baselineComparison.map((item) => {
                const config = comparisonStatusConfig[item.status];
                const StatusIcon = config.icon;
                const change = ((item.current - item.baseline) / item.baseline) * 100;

                return (
                  <div
                    key={item.metric}
                    className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <StatusIcon className={cn("h-4 w-4", config.className)} />
                      <span className="text-sm font-medium">{item.metric}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right">
                        <span className="text-muted-foreground">Baseline: </span>
                        <span className="font-mono">{item.baseline}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-muted-foreground">Current: </span>
                        <span className={cn("font-mono font-medium", config.className)}>
                          {item.current}
                        </span>
                      </div>
                      {item.status !== "normal" && (
                        <span className={cn("text-xs font-medium", config.className)}>
                          +{change.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Anomaly Details */}
        {detail.anomalies.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">Detected Anomalies</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detail.anomalies.map((anomaly) => (
                <div
                  key={anomaly.id}
                  className={cn(
                    "rounded-xl border p-5",
                    anomaly.severity === "high" && "border-risk-high/30 bg-risk-high/5",
                    anomaly.severity === "medium" && "border-risk-medium/30 bg-risk-medium/5",
                    anomaly.severity === "normal" && "border-border bg-card"
                  )}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={cn(
                          "h-4 w-4",
                          anomaly.severity === "high" && "text-risk-high",
                          anomaly.severity === "medium" && "text-risk-medium",
                          anomaly.severity === "normal" && "text-muted-foreground"
                        )}
                      />
                      <span className="text-xs font-medium uppercase text-muted-foreground">
                        {anomaly.type}
                      </span>
                    </div>
                    <SeverityBadge severity={anomaly.severity} size="sm" />
                  </div>
                  <h3 className="font-semibold mb-2">{anomaly.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{anomaly.description}</p>
                  <div className="flex items-center justify-between rounded-lg bg-background/50 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Deviation</span>
                    <span
                      className={cn(
                        "font-mono font-semibold",
                        anomaly.severity === "high" && "text-risk-high",
                        anomaly.severity === "medium" && "text-risk-medium"
                      )}
                    >
                      +{anomaly.deviation}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WeekDetail;
