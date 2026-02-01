import { useState } from "react";
import { Code2, Copy, Check, ExternalLink, Key, Webhook } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { apiEndpoints } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const sampleResponses: Record<string, object> = {
  "/api/v1/analysis/current": {
    week: "2026-W05",
    period: { start: "2026-01-27", end: "2026-02-02" },
    risk_level: "normal",
    risk_score: 23,
    summary: {
      total_events: 1247832,
      anomalies_detected: 3,
      false_positive_rate: 0.02,
    },
    anomalies: [
      {
        id: "anom_004",
        type: "access",
        severity: "low",
        title: "Minor Login Pattern Shift",
        explanation: "Slight variation in typical login times for 3 user accounts",
      },
    ],
  },
  "/api/v1/analysis/weeks": {
    weeks: [
      { id: "2026-W05", risk_score: 23, severity: "normal" },
      { id: "2026-W04", risk_score: 22, severity: "normal" },
      { id: "2026-W03", risk_score: 28, severity: "normal" },
      { id: "2026-W02", risk_score: 38, severity: "medium" },
      { id: "2026-W01", risk_score: 62, severity: "medium" },
    ],
    total: 52,
    page: 1,
    per_page: 10,
  },
  "/api/v1/analysis/weeks/{weekId}": {
    week: "2026-W01",
    period: { start: "2025-12-30", end: "2026-01-05" },
    risk_level: "medium",
    risk_score: 62,
    anomalies: [
      {
        id: "anom_001",
        type: "authentication",
        severity: "high",
        title: "Failed Login Spike",
        metric: "failed_logins",
        baseline_value: 145,
        current_value: 892,
        deviation_percent: 515,
        explanation: "Unusual increase in failed authentication attempts",
      },
    ],
    baseline_comparison: [
      { metric: "failed_logins", baseline: 145, current: 892, status: "critical" },
      { metric: "outbound_traffic_gb", baseline: 2.4, current: 8.7, status: "elevated" },
    ],
    explanation_reasons: [
      "Failed login attempts increased by 515% compared to baseline",
      "Outbound data transfer exceeded normal thresholds by 262%",
    ],
  },
  "/api/v1/anomalies": {
    anomalies: [
      {
        id: "anom_001",
        week: "2026-W01",
        type: "authentication",
        severity: "high",
        title: "Failed Login Spike",
        detected_at: "2026-01-03T02:15:00Z",
      },
    ],
    filters: { severity: null, type: null, week: null },
    total: 39,
  },
  "/api/v1/metrics/{metricName}/trend": {
    metric: "failed_logins",
    unit: "attempts",
    baseline: { average: 145, low: 120, high: 170 },
    trend: [
      { week: "W50", value: 132 },
      { week: "W51", value: 156 },
      { week: "W52", value: 312 },
      { week: "W01", value: 892 },
      { week: "W02", value: 234 },
    ],
  },
  "/api/v1/webhooks": {
    message: "Webhook configured successfully",
    webhook: {
      id: "wh_12345",
      url: "https://your-app.com/webhook",
      events: ["anomaly.detected", "weekly.report.ready"],
      created_at: "2026-02-01T10:00:00Z",
    },
  },
};

const methodColors: Record<string, string> = {
  GET: "bg-risk-normal/15 text-risk-normal",
  POST: "bg-primary/15 text-primary",
  PUT: "bg-risk-medium/15 text-risk-medium",
  DELETE: "bg-risk-high/15 text-risk-high",
};

const ApiIntegration = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0].endpoint);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const currentResponse = sampleResponses[selectedEndpoint] || sampleResponses["/api/v1/analysis/current"];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(currentResponse, null, 2));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText("sk_live_sentinel_xxxxxxxxxxxxxxxx");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">API-First Platform</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">API & Integration</h1>
          <p className="mt-1 text-muted-foreground">
            Programmatic access to weekly analysis, anomalies, and security insights
          </p>
        </div>

        {/* API Key Section */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-risk-medium/10 p-2">
                <Key className="h-5 w-5 text-risk-medium" />
              </div>
              <div>
                <h3 className="font-semibold">API Key</h3>
                <p className="text-sm text-muted-foreground">Use this key in the Authorization header</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <code className="rounded-lg bg-muted px-4 py-2 font-mono text-sm">
                sk_live_sentinel_••••••••••••
              </code>
              <button
                onClick={handleCopyKey}
                className="rounded-lg border border-border bg-card p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {copiedKey ? <Check className="h-4 w-4 text-risk-normal" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Endpoints List */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border px-4 py-3">
              <h2 className="font-semibold">Available Endpoints</h2>
            </div>
            <div className="divide-y divide-border">
              {apiEndpoints.map((endpoint) => (
                <button
                  key={endpoint.endpoint}
                  onClick={() => setSelectedEndpoint(endpoint.endpoint)}
                  className={cn(
                    "w-full px-4 py-4 text-left transition-colors hover:bg-muted/50",
                    selectedEndpoint === endpoint.endpoint && "bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className={cn("rounded px-2 py-0.5 text-xs font-bold", methodColors[endpoint.method])}>
                      {endpoint.method}
                    </span>
                    <code className="text-sm font-mono text-foreground">{endpoint.endpoint}</code>
                  </div>
                  <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Response Preview */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Response Preview</span>
                <span className="rounded bg-risk-normal/15 px-2 py-0.5 text-xs font-medium text-risk-normal">
                  200 OK
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3 w-3 text-risk-normal" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="max-h-[500px] overflow-auto">
              <pre className="p-4 text-xs leading-relaxed">
                <code className="font-mono">
                  {JSON.stringify(currentResponse, null, 2)
                    .split("\n")
                    .map((line, i) => {
                      const keyMatch = line.match(/^(\s*)"([^"]+)":/);
                      const valueMatch = line.match(/:\s*(".*"|[\d.]+|true|false|null)/);

                      return (
                        <div key={i} className="hover:bg-muted/30 -mx-4 px-4">
                          {keyMatch ? (
                            <>
                              <span className="text-muted-foreground">{keyMatch[1]}</span>
                              <span className="text-primary">"{keyMatch[2]}"</span>
                              <span className="text-muted-foreground">:</span>
                              {valueMatch && (
                                <span className="text-risk-normal">{line.split(":").slice(1).join(":")}</span>
                              )}
                              {!valueMatch && <span className="text-foreground">{line.split(":").slice(1).join(":")}</span>}
                            </>
                          ) : (
                            <span className="text-muted-foreground">{line}</span>
                          )}
                        </div>
                      );
                    })}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Webhook Section */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Webhook className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Webhook Notifications</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive real-time notifications when anomalies are detected or weekly reports are ready.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">anomaly.detected</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">weekly.report.ready</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">risk.level.changed</span>
                </div>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Configure Webhooks
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Documentation Link */}
        <div className="mt-6 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View full API documentation
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </main>
    </div>
  );
};

export default ApiIntegration;
