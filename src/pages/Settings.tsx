import { useState } from "react";
import { Save, Calendar, Bell, Shield, Sliders } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const metricPriorities = [
  { id: "failed_logins", label: "Failed Logins", description: "Authentication failure tracking" },
  { id: "outbound_traffic", label: "Outbound Traffic", description: "Data transfer volume monitoring" },
  { id: "alert_count", label: "Alert Count", description: "Security alert frequency" },
  { id: "unique_ips", label: "Unique IPs", description: "New IP address detection" },
  { id: "geo_anomalies", label: "Geographic Anomalies", description: "Unusual location access" },
];

const sensitivityLabels = ["Conservative", "Balanced", "Aggressive"];

const Settings = () => {
  const [sensitivity, setSensitivity] = useState([1]); // 0 = Conservative, 1 = Balanced, 2 = Aggressive
  const [enabledMetrics, setEnabledMetrics] = useState<Record<string, boolean>>({
    failed_logins: true,
    outbound_traffic: true,
    alert_count: true,
    unique_ips: false,
    geo_anomalies: true,
  });
  const [notifications, setNotifications] = useState({
    email: true,
    webhook: false,
    slack: false,
  });
  const [saved, setSaved] = useState(false);

  const handleMetricToggle = (metricId: string) => {
    setEnabledMetrics((prev) => ({ ...prev, [metricId]: !prev[metricId] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Configure analysis behavior and notification preferences
          </p>
        </div>

        {/* Sensitivity Section */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-2">
              <Sliders className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Detection Sensitivity</h2>
              <p className="text-sm text-muted-foreground">
                Adjust how aggressively the system flags anomalies
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="px-2">
              <Slider
                value={sensitivity}
                onValueChange={setSensitivity}
                max={2}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex justify-between text-sm">
              {sensitivityLabels.map((label, index) => (
                <div
                  key={label}
                  className={cn(
                    "text-center transition-colors",
                    sensitivity[0] === index ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  <p>{label}</p>
                  <p className="text-xs mt-0.5">
                    {index === 0 && "Fewer alerts, higher threshold"}
                    {index === 1 && "Balanced detection"}
                    {index === 2 && "More alerts, lower threshold"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metric Priorities Section */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-2">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Metric Priorities</h2>
              <p className="text-sm text-muted-foreground">
                Select which metrics to include in risk scoring
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {metricPriorities.map((metric) => (
              <div
                key={metric.id}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-4 py-3 transition-colors",
                  enabledMetrics[metric.id] ? "border-primary/30 bg-primary/5" : "border-border"
                )}
              >
                <div className="flex items-center gap-3">
                  <Switch
                    id={metric.id}
                    checked={enabledMetrics[metric.id]}
                    onCheckedChange={() => handleMetricToggle(metric.id)}
                  />
                  <div>
                    <Label htmlFor={metric.id} className="font-medium cursor-pointer">
                      {metric.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                {enabledMetrics[metric.id] && (
                  <span className="text-xs font-medium text-primary">Active</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Schedule */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Analysis Schedule</h2>
              <p className="text-sm text-muted-foreground">
                When weekly analysis reports are generated
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Frequency</p>
                <p className="font-medium">Weekly</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Analysis Day</p>
                <p className="font-medium">Every Sunday</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Time</p>
                <p className="font-medium">09:00 UTC</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Analysis covers the previous 7 days (Monday 00:00 to Sunday 23:59 UTC)
            </p>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="rounded-xl border border-border bg-card p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-2">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Notification Channels</h2>
              <p className="text-sm text-muted-foreground">
                How you receive alerts and weekly reports
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive weekly summaries and high-risk alerts</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <p className="font-medium">Webhook Notifications</p>
                <p className="text-xs text-muted-foreground">POST to your configured endpoint</p>
              </div>
              <Switch
                checked={notifications.webhook}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, webhook: checked }))}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <p className="font-medium">Slack Integration</p>
                <p className="text-xs text-muted-foreground">Send alerts to a Slack channel</p>
              </div>
              <Switch
                checked={notifications.slack}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, slack: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all",
              saved
                ? "bg-risk-normal text-risk-normal-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {saved ? (
              <>
                <Save className="h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
