import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ProblemStatsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
}

export default function ProblemStats({ stats }: ProblemStatsProps) {
  const { difficultyCounts, submissionAnalysis, totalProblemsSolved } = stats || {};
  
  const difficultyData = [
    { name: "Easy", value: difficultyCounts?.EASY || 0, color: "#22c55e" },
    { name: "Medium", value: difficultyCounts?.MEDIUM || 0, color: "#eab308" },
    { name: "Hard", value: difficultyCounts?.HARD || 0, color: "#ef4444" },
  ].filter(item => item.value > 0);

  // Fallback for empty state
  if (difficultyData.length === 0) {
    difficultyData.push({ name: "Unsolved", value: 1, color: "#e5e7eb" });
  }

  const submissionData = Object.keys(submissionAnalysis || {}).map(key => {
    let color = "#3b82f6";
    if (key === "Accepted") color = "#22c55e";
    if (key === "Wrong Answer") color = "#ef4444";
    if (key === "Time Limit Exceeded") color = "#f97316";
    if (key === "Compile Error" || key === "Compilation Error") color = "#8b5cf6";
    
    return { name: key, value: submissionAnalysis[key], color };
  });

  if (submissionData.length === 0) {
    submissionData.push({ name: "No Submissions", value: 1, color: "#e5e7eb" });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
      <Card className="shadow-xs border-border bg-card">
        <CardHeader className="p-5 pb-0">
          <CardTitle className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Problems Solved</CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-2 flex items-center justify-between gap-4">
          <div className="relative h-32 w-32 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  dataKey="value"
                  stroke="none"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", background: "var(--card)" }}
                   itemStyle={{ color: "var(--foreground)", fontSize: "12px", fontWeight: "bold" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
               <span className="text-xs font-bold text-foreground">{totalProblemsSolved || 0}</span>
               <span className="text-[10px] text-muted-foreground">Total</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   <span className="text-muted-foreground">Easy</span>
                </div>
                <span className="font-medium">{difficultyCounts?.EASY || 0}</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                   <span className="text-muted-foreground">Medium</span>
                </div>
                <span className="font-medium">{difficultyCounts?.MEDIUM || 0}</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                   <span className="text-muted-foreground">Hard</span>
                </div>
                <span className="font-medium">{difficultyCounts?.HARD || 0}</span>
             </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xs border-border bg-card">
         <CardHeader className="p-5 pb-0">
           <CardTitle className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Submission Analysis</CardTitle>
         </CardHeader>
         <CardContent className="p-5 pt-2 flex items-center gap-6">
           <div className="h-32 w-32 flex-shrink-0">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={submissionData}
                   cx="50%"
                   cy="50%"
                   innerRadius={35}
                   outerRadius={55}
                   dataKey="value"
                   stroke="none"
                 >
                   {submissionData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip 
                   contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", background: "var(--card)" }}
                   itemStyle={{ color: "var(--foreground)", fontSize: "12px", fontWeight: "bold" }}
                 />
               </PieChart>
             </ResponsiveContainer>
           </div>
           
           <div className="flex-1 space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
              {submissionData.filter(d => d.name !== "No Submissions").map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                       <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                       <span className="text-muted-foreground truncate">{item.name}</span>
                    </div>
                    <span className="font-medium ml-2">{item.value}</span>
                 </div>
              ))}
              
              {submissionData[0]?.name === "No Submissions" && (
                 <span className="text-xs text-muted-foreground italic">No data yet</span>
              )}
           </div>
         </CardContent>
      </Card>
    </div>
  );
}
