import { cn } from "@/lib/utils";

type Severity = "normal" | "medium" | "high";

interface SeverityBadgeProps {
  severity: Severity;
  size?: "sm" | "md";
}

const severityConfig = {
  normal: {
    label: "Normal",
    className: "bg-risk-normal/15 text-risk-normal border-risk-normal/30",
    dotClass: "bg-risk-normal",
  },
  medium: {
    label: "Medium",
    className: "bg-risk-medium/15 text-risk-medium border-risk-medium/30",
    dotClass: "bg-risk-medium",
  },
  high: {
    label: "High",
    className: "bg-risk-high/15 text-risk-high border-risk-high/30",
    dotClass: "bg-risk-high",
  },
};

export function SeverityBadge({ severity, size = "md" }: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        config.className,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotClass)} />
      {config.label}
    </span>
  );
}
