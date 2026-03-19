import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MyActivityProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
}

export default function MyActivity({ stats }: MyActivityProps) {
  const { activityHeatmap = {}, activeDays = 0 } = stats || {};
  const submissionsThisYear = stats?.submissionsThisYear ?? 0;
  const maxStreakDays = stats?.maxStreakDays ?? 0;
  const year = stats?.year ?? new Date().getFullYear();

  // Generate 365 days ending today using UTC midnight so the day keys
  // match backend `toISOString().split("T")[0]`.
  const now = new Date();
  const utcToday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Array.from({ length: 365 }).map((_, i) => {
    // oldest -> newest
    return new Date(utcToday.getTime() - (364 - i) * dayMs);
  });
  
  // Create 7 lists of dates (Mon-Sun) to match a column-major grid format more easily
  // Or just display flex-wrap. We'll simulate a GitHub-style grid using columns
  // Group days into columns of 7
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  days.forEach(day => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const getHeatmapStyle = (count: number) => {
    if (!count) {
      return {
        backgroundColor: "rgba(148, 163, 184, 0.25)",
        borderColor: "rgba(148, 163, 184, 0.55)",
      };
    }
    if (count === 1) {
      return {
        backgroundColor: "rgba(187, 247, 208, 0.9)",
        borderColor: "#4ade80",
      };
    }
    if (count <= 3) {
      return {
        backgroundColor: "rgba(74, 222, 128, 0.85)",
        borderColor: "#16a34a",
      };
    }
    return {
      backgroundColor: "rgba(22, 163, 74, 0.85)",
      borderColor: "#14532d",
    };
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="flex flex-col gap-4 w-full mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">My Activity</h2>
        <Button variant="link" className="text-primary h-auto p-0 text-sm font-medium">View Solved Problems</Button>
      </div>
      
      <Card className="shadow-xs border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-muted-foreground">
              <strong className="text-foreground">{submissionsThisYear}</strong> Submissions this year
            </span>
            <div className="flex items-center gap-6">
              <span className="text-sm text-muted-foreground">Active Days <strong className="text-foreground">{activeDays}</strong></span>
              <span className="text-sm text-muted-foreground">
                Max Streak <strong className="text-foreground">{maxStreakDays}</strong>{" "}
                {maxStreakDays === 1 ? "Day" : "Days"}
              </span>
              
              <Button variant="outline" size="sm" className="h-7 text-xs px-2 gap-1 rounded-sm bg-muted/20">
                {year} <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="w-full overflow-hidden pb-4">
            {/* Grid: 53 columns × 7 rows — cells shrink to fit, no scrollbar */}
            <div
              className="grid w-full gap-[2px] overflow-hidden"
              style={{ gridTemplateColumns: "repeat(53, minmax(0, 1fr))", gridTemplateRows: "repeat(7, minmax(10px, 1fr))" }}
            >
              {Array.from({ length: 7 }).flatMap((_, rowIdx) =>
                weeks.map((week, colIdx) => {
                  const date = week[rowIdx];
                  if (!date) return [<div key={`${colIdx}-${rowIdx}`} />];
                  const dateStr = date.toISOString().split("T")[0];
                  const count = activityHeatmap[dateStr] || 0;
                  return [
                    <div
                      key={`${colIdx}-${rowIdx}`}
                      className="aspect-square min-h-0 min-w-0 rounded-[2px] border border-transparent hover:ring-2 hover:ring-primary/50 cursor-pointer transition-all"
                      style={{ ...getHeatmapStyle(count), maxWidth: "100%" }}
                      title={`${count} submissions on ${dateStr}`}
                    />,
                  ];
                })
              )}
            </div>
            <div className="flex justify-between mt-2 w-full px-0.5 text-xs text-muted-foreground">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
