import { Code2, Copy, Check } from "lucide-react";
import { useState } from "react";

const sampleResponse = {
  week: "2026-W05",
  period: {
    start: "2026-01-27",
    end: "2026-02-02"
  },
  risk_level: "normal",
  risk_score: 23,
  summary: {
    total_events: 1247832,
    anomalies_detected: 3,
    false_positive_rate: 0.02
  },
  anomalies: [
    {
      id: "anom_001",
      type: "unusual_login_pattern",
      severity: "low",
      explanation: "3 logins from new geographic location"
    }
  ]
};

export function ApiPreview() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">API Response Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-risk-normal/15 px-2 py-0.5 text-xs font-medium text-risk-normal">
            GET /api/v1/analysis/current
          </span>
          <button
            onClick={handleCopy}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {copied ? (
              <Check className="h-4 w-4 text-risk-normal" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div className="max-h-[300px] overflow-auto">
        <pre className="p-4 text-xs leading-relaxed">
          <code className="font-mono text-muted-foreground">
            {JSON.stringify(sampleResponse, null, 2)
              .split('\n')
              .map((line, i) => (
                <div key={i} className="hover:bg-muted/30 -mx-4 px-4">
                  {line.includes(':') ? (
                    <>
                      <span className="text-primary">
                        {line.split(':')[0]}
                      </span>
                      <span className="text-muted-foreground">:</span>
                      <span className="text-foreground">
                        {line.split(':').slice(1).join(':')}
                      </span>
                    </>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
