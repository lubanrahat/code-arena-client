import { Card, CardContent } from "@/components/ui/card";
import { Zap, Coins, Flame, Code, Share2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MyProgressProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
}

export default function MyProgress({ stats }: MyProgressProps) {
  const totalScore = stats?.totalScore ?? 0;
  const coins = stats?.coins ?? 0;
  const activeDays = stats?.activeDays ?? 0;
  const totalProblemsSolved = stats?.totalProblemsSolved ?? 0;

  const dailySubmissionsLast7: number[] = Array.isArray(stats?.dailySubmissionsLast7)
    ? stats.dailySubmissionsLast7
    : [];

  const series = dailySubmissionsLast7.length === 7 ? dailySubmissionsLast7 : Array(7).fill(0);
  const maxSeries = Math.max(1, ...series);

  const points = series.map((v, i) => {
    const lineWidth = 100;
    const lineHeight = 80;
    const x = (lineWidth / (series.length - 1)) * i;
    const y = lineHeight - (v / maxSeries) * lineHeight;
    return `${x},${y}`;
  });

  const pathD = points
    .map((p, i) => (i === 0 ? `M${p}` : `L${p}`))
    .join(" ");

  const last7Days = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - idx));
    return d.toLocaleDateString("en-US", { weekday: "short" });
  });

  const cards = [
    {
      title: "TOTAL SCORE",
      value: totalScore.toLocaleString(),
      icon: <Zap className="h-5 w-5 text-cyan-500 fill-cyan-500/20" />,
    },
    {
      title: "COINS",
      value: coins.toLocaleString(),
      icon: <Coins className="h-5 w-5 text-amber-500 fill-amber-500/20" />,
    },
    {
      title: "STREAK",
      value: activeDays,
      icon: <Flame className="h-5 w-5 text-red-500 fill-red-500/20" />,
    },
    {
      title: "PROBLEMS",
      value: totalProblemsSolved,
      icon: <Code className="h-5 w-5 text-blue-500 fill-blue-500/20" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-bold text-foreground">My Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Goal Chart mock */}
        <Card className="shadow-xs border-border bg-card">
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-muted-foreground tracking-wider">DAILY GOAL</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                  <Share2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 relative w-full mt-2 h-[120px] flex items-end overflow-hidden pb-6">
               {/* Y Axis line */}
               <div className="absolute left-0 bottom-6 top-0 w-8 flex flex-col justify-between text-[10px] text-muted-foreground border-r border-border/50 pr-2">
                  <div className="text-right">200</div>
                  <div className="text-right">150</div>
                  <div className="text-right">100</div>
                  <div className="text-right">50</div>
                  <div className="text-right">0</div>
               </div>
               
               {/* X Axis labels */}
               <div className="absolute bottom-0 left-10 flex justify-between w-[calc(100%-40px)] text-[10px] text-muted-foreground pb-1">
                 {last7Days.map((label, idx) => (
                   <span key={idx}>{label}</span>
                 ))}
               </div>
               
               {/* Line chart based on last 7 days */}
               <svg className="absolute left-10 bottom-6 w-[calc(100%-40px)] h-[80%]" preserveAspectRatio="none">
                 <path
                   d={pathD}
                   fill="none"
                   stroke="currentColor"
                   className="text-cyan-500"
                   strokeWidth="2"
                 />
               </svg>
            </div>
          </CardContent>
        </Card>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <Card key={index} className="shadow-xs border-border bg-card hover:border-primary/20 transition-colors">
              <CardContent className="p-5 flex flex-col gap-3 justify-center h-full">
                <h3 className="text-[11px] font-bold text-muted-foreground tracking-wider">{card.title}</h3>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center bg-muted/30 shrinks-0">
                    {card.icon}
                  </div>
                  <span className="text-xl lg:text-2xl font-bold text-foreground truncate">{card.value}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
