import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Eye, Calendar } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { SeverityBadge } from "@/components/ui/SeverityBadge";
import { weeksData, Severity } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WeeklySummary = () => {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filteredWeeks = weeksData.filter((week) => {
    if (severityFilter === "all") return true;
    return week.severity === severityFilter;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Weekly Summary</h1>
            <p className="mt-1 text-muted-foreground">
              Historical view of security posture week-by-week
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[140px] bg-card border-border">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>

            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[160px] bg-card border-border">
                <SelectValue placeholder="Filter severity" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Weeks Analyzed</p>
            <p className="mt-1 text-2xl font-semibold">{weeksData.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Avg Risk Score</p>
            <p className="mt-1 text-2xl font-semibold">
              {Math.round(weeksData.reduce((acc, w) => acc + w.riskScore, 0) / weeksData.length)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Anomalies</p>
            <p className="mt-1 text-2xl font-semibold">
              {weeksData.reduce((acc, w) => acc + w.anomaliesDetected, 0)}
            </p>
          </div>
        </div>

        {/* Weekly Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">Week</TableHead>
                <TableHead className="text-muted-foreground font-medium">Date Range</TableHead>
                <TableHead className="text-muted-foreground font-medium text-center">Risk Score</TableHead>
                <TableHead className="text-muted-foreground font-medium">Severity</TableHead>
                <TableHead className="text-muted-foreground font-medium text-center">Anomalies</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">Events</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWeeks.map((week, index) => (
                <TableRow
                  key={week.id}
                  className={cn(
                    "border-border transition-colors",
                    index === 0 && "bg-primary/5"
                  )}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {week.week}
                      {index === 0 && (
                        <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                          CURRENT
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{week.dateRange}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "font-mono font-medium",
                        week.severity === "normal" && "text-risk-normal",
                        week.severity === "medium" && "text-risk-medium",
                        week.severity === "high" && "text-risk-high"
                      )}
                    >
                      {week.riskScore}
                    </span>
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={week.severity} size="sm" />
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "font-mono",
                        week.anomaliesDetected > 5 && "text-risk-medium",
                        week.anomaliesDetected > 10 && "text-risk-high"
                      )}
                    >
                      {week.anomaliesDetected}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground font-mono">
                    {formatNumber(week.eventsProcessed)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      to={`/week/${week.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default WeeklySummary;
