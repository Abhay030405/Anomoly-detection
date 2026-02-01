import { Link } from "react-router-dom";
import { Activity, AlertTriangle, BarChart3, Shield, ArrowRight } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { WeeklyStatusCard } from "@/components/dashboard/WeeklyStatusCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RiskTrendChart } from "@/components/dashboard/RiskTrendChart";
import { ApiPreview } from "@/components/dashboard/ApiPreview";

const trendData = [
  { week: "W50", riskScore: 18, anomalies: 2 },
  { week: "W51", riskScore: 25, anomalies: 4 },
  { week: "W52", riskScore: 45, anomalies: 8 },
  { week: "W01", riskScore: 62, anomalies: 12 },
  { week: "W02", riskScore: 38, anomalies: 5 },
  { week: "W03", riskScore: 28, anomalies: 3 },
  { week: "W04", riskScore: 22, anomalies: 2 },
  { week: "W05", riskScore: 23, anomalies: 3 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Security Overview</h1>
          <p className="mt-1 text-muted-foreground">
            AI-powered threat detection and anomaly analysis
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Weekly Status - Spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <WeeklyStatusCard
              weekLabel="Week 5, 2026 (Jan 27 - Feb 2)"
              riskLevel="normal"
              riskScore={23}
              lastUpdated="Feb 1, 2026 at 09:00 UTC"
            />
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <MetricCard
              title="Risk Score"
              value="23"
              subtitle="Out of 100"
              icon={Shield}
              variant="success"
              trend={{ value: 18, isPositive: true }}
            />
            <MetricCard
              title="Anomalies Detected"
              value="3"
              subtitle="This week"
              icon={AlertTriangle}
              variant="default"
              trend={{ value: 25, isPositive: true }}
            />
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Events Processed"
            value="1.2M"
            subtitle="Total telemetry events"
            icon={Activity}
          />
          <MetricCard
            title="Baseline Accuracy"
            value="99.8%"
            subtitle="Model confidence"
            icon={BarChart3}
            variant="success"
          />
          <MetricCard
            title="False Positive Rate"
            value="0.02%"
            subtitle="Industry avg: 0.5%"
            icon={Shield}
            variant="success"
          />
          <MetricCard
            title="Analysis Coverage"
            value="100%"
            subtitle="All endpoints monitored"
            icon={Activity}
          />
        </div>

        {/* Charts and API Section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <RiskTrendChart data={trendData} />
          <ApiPreview />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/weekly-summary"
            className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">View All Weeks</h3>
                <p className="text-sm text-muted-foreground">
                  Historical security posture analysis
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
          <Link
            to="/api"
            className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">API Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Programmatic access to security insights
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
