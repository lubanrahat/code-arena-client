import React from "react";
import { Trophy, Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContestsPage() {
  const upcomingContests = [
    {
      title: "Weekly Challenge #42",
      date: "April 18, 2026",
      time: "10:00 AM UTC",
      participants: 1240,
      status: "Upcoming",
      duration: "90 mins"
    },
    {
      title: "Biweekly Challenge #15",
      date: "April 22, 2026",
      time: "2:30 PM UTC",
      participants: 800,
      status: "Upcoming",
      duration: "120 mins"
    }
  ];

  const pastContests = [
    {
      title: "Weekly Challenge #41",
      date: "April 11, 2026",
      participants: 3420,
      winner: "alex_coder99",
    },
    {
      title: "Weekly Challenge #40",
      date: "April 4, 2026",
      participants: 3100,
      winner: "algo_master",
    },
    {
      title: "Spring Coding Cup 2026",
      date: "March 20, 2026",
      participants: 8500,
      winner: "tourist_fan",
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-24">
      {/* Hero Section */}
      <div className="bg-zinc-900 dark:bg-black pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[100px]"></div>

        <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl shadow-orange-500/20 flex items-center justify-center mb-6">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Global Contests
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
             Test your skills against thousands of developers worldwide. Improve your rating, win prizes, and get noticed by top companies.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl -mt-10 relative z-20 space-y-12">
        {/* Upcoming Contests */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Upcoming Contests</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingContests.map((contest, idx) => (
              <Card key={idx} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none hover:border-blue-500/50 transition-colors">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">
                      {contest.status}
                    </Badge>
                     <div className="flex items-center text-sm text-zinc-500 font-medium">
                       <Users className="w-4 h-4 mr-1.5" />
                       {contest.participants.toLocaleString()} Registered
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{contest.title}</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                     <div className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <Calendar className="w-5 h-5 mr-2 text-zinc-400" />
                        {contest.date}
                     </div>
                     <div className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <Clock className="w-5 h-5 mr-2 text-zinc-400" />
                        {contest.time}
                     </div>
                  </div>

                  <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 h-12 rounded-xl text-base font-semibold">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Contests */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Past Contests</h2>
            <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
             <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
               {pastContests.map((contest, idx) => (
                 <div key={idx} className="p-6 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                   <div className="flex-1">
                     <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{contest.title}</h3>
                     <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {contest.date}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> {contest.participants.toLocaleString()}</span>
                     </div>
                   </div>
                   <div className="flex items-center gap-4 md:gap-8">
                     <div className="hidden sm:block text-right">
                       <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Winner</div>
                       <div className="font-mono text-sm font-semibold text-amazon-500 dark:text-amber-400">{contest.winner}</div>
                     </div>
                     <Button variant="outline" className="rounded-full">
                       Practice Problems
                     </Button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
