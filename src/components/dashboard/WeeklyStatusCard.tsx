import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskLevel = "normal" | "medium" | "high";

interface WeeklyStatusCardProps {
  weekLabel: string;
  riskLevel: RiskLevel;
  riskScore: number;
  lastUpdated: string;
}

const riskConfig = {
  normal: {
    label: "Normal",
    description: "No significant anomalies detected",
    icon: ShieldCheck,
    containerClass: "risk-normal",
    badgeClass: "bg-risk-normal/15 text-risk-normal border-risk-normal/30",
    iconClass: "text-risk-normal",
    glowClass: "shadow-[0_0_60px_-15px_hsl(var(--risk-normal)/0.5)]",
  },
  medium: {
    label: "Medium Risk",
    description: "Anomalies detected requiring attention",
    icon: Shield,
    containerClass: "risk-medium",
    badgeClass: "bg-risk-medium/15 text-risk-medium border-risk-medium/30",
    iconClass: "text-risk-medium",
    glowClass: "shadow-[0_0_60px_-15px_hsl(var(--risk-medium)/0.5)]",
  },
  high: {
    label: "High Risk",
    description: "Critical anomalies require immediate review",
    icon: ShieldAlert,
    containerClass: "risk-high",
    badgeClass: "bg-risk-high/15 text-risk-high border-risk-high/30",
    iconClass: "text-risk-high",
    glowClass: "shadow-[0_0_60px_-15px_hsl(var(--risk-high)/0.5)]",
  },
};

export function WeeklyStatusCard({
  weekLabel,
  riskLevel,
  riskScore,
  lastUpdated,
}: WeeklyStatusCardProps) {
  const config = riskConfig[riskLevel];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card p-8 transition-all duration-300",
        config.containerClass,
        config.glowClass
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Current Analysis Period
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">{weekLabel}</h2>
        </div>
        <div className="relative">
          <div className="risk-indicator">
            <Icon className={cn("h-12 w-12", config.iconClass)} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold",
              config.badgeClass
            )}
          >
            {config.label}
          </span>
          <span className="text-sm text-muted-foreground">
            Risk Score: <span className="font-mono font-medium text-foreground">{riskScore}</span>/100
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </span>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View Week Details →
        </button>
      </div>
    </div>
  );
}
