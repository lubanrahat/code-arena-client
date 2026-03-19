import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

interface SkillAnalysisProps {
  stats: unknown;
}

export default function SkillAnalysis({ stats }: SkillAnalysisProps) {
  type SkillBar = { name: string; value: number };

  type SkillCandidate = { name?: unknown; value?: unknown };
  const skillsRaw = (stats as { skills?: unknown } | null | undefined)?.skills;

  const skills: SkillBar[] = Array.isArray(skillsRaw)
    ? skillsRaw.map((s): SkillBar => {
        const candidate = s as SkillCandidate;
        return {
          name: typeof candidate?.name === "string" ? candidate.name : "",
          value:
            typeof candidate?.value === "number"
              ? candidate.value
              : Number(candidate?.value ?? 0),
        };
      })
    : [];

  return (
    <Card className="w-full mt-4 shadow-xs border-border bg-card">
      <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between w-full h-auto">
        <div className="flex items-center gap-2">
           <CardTitle className="text-sm font-bold text-foreground">Skill Analysis</CardTitle>
           <Info className="h-4 w-4 text-muted-foreground cursor-help" />
        </div>
        <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer">Skill Analysis</span>
      </CardHeader>
      
      <CardContent className="p-5">
         <div className="space-y-4">
            {skills.map((skill: SkillBar, index: number) => (
               <div key={index} className="flex items-center gap-4 text-sm w-full lg:w-1/2">
                  <span className="w-32 text-muted-foreground truncate shrink-0">{skill.name}</span>
                  <div className="h-4 w-full rounded-full bg-muted/50 overflow-hidden relative border border-border/50">
                     <div 
                        className={`h-full absolute left-0 top-0 transition-all duration-1000 bg-linear-to-r from-red-500/80 to-red-300`} 
                        style={{ width: `${Math.max(0, Math.min(100, Number(skill.value) || 0))}%` }} 
                     />
                  </div>
               </div>
            ))}
         </div>
         {skills.length === 0 && (
             <div className="text-sm text-muted-foreground italic text-center py-4">Not enough data to analyze skills.</div>
         )}
      </CardContent>
    </Card>
  );
}
