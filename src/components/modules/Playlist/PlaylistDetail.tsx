"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlaylistDetails, removeProblemFromPlaylist } from "@/app/playlists/_action";
import { ListMusic, Trash2, ArrowLeft, Play, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PlaylistProblem {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | string;
  topic?: string;
}

interface PlaylistProblemRelation {
  problem: PlaylistProblem;
}

export default function PlaylistDetail({ playlistId }: { playlistId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: playlist, isLoading } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: async () => {
      const res = await getPlaylistDetails(playlistId);
      return res?.data || null;
    },
  });

  const removeMutation = useMutation({
    mutationFn: (problemId: string) => removeProblemFromPlaylist(playlistId, problemId),
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.message || "Failed to remove problem");
      } else {
        toast.success("Problem removed from playlist");
        queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
      }
    },
  });

  const handleRemove = (e: React.MouseEvent, problemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this problem from the playlist?")) {
      removeMutation.mutate(problemId);
    }
  };

  const difficultyStyles: Record<string, string> = {
    EASY: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    MEDIUM: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    HARD: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 border-rose-200 dark:border-rose-800",
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 mt-20 animate-pulse">
        <div className="h-40 bg-muted/60 rounded-3xl mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted/60 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center min-h-[60vh]">
        <h3 className="text-2xl font-bold mb-2">Playlist Not Found</h3>
        <p className="text-neutral-500 mb-6">This playlist doesn&apos;t exist or you don&apos;t have access to it.</p>
        <Button onClick={() => router.push("/playlists")} variant="outline">
          Back to Playlists
        </Button>
      </div>
    );
  }

  const problems: PlaylistProblem[] = playlist.problems?.map((p: PlaylistProblemRelation) => p.problem) || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 mb-20 relative z-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/playlists"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Playlists
      </Link>

      <div className="bg-white/40 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 sm:p-12 mb-12 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20">
              <ListMusic className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white mb-4 tracking-tight">
              {playlist.name}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl font-medium">
              {playlist.description || "No description provided."}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center px-6 py-3 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
              <div className="text-2xl font-black">{problems.length}</div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Problems</div>
            </div>
            
            {problems.length > 0 && (
              <Button 
                onClick={() => router.push(`/problems/${problems[0].id}`)}
                className="bg-neutral-950 dark:bg-white text-white dark:text-black h-[72px] rounded-2xl px-8 font-bold shadow-xl hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Play All
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {problems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
            <Zap className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-4" />
            <h3 className="text-xl font-bold mb-2">No problems yet</h3>
            <p className="text-neutral-500 max-w-sm">
              Head over to the problems page and add some challenges to this playlist.
            </p>
            <Button onClick={() => router.push("/problems")} className="mt-6 font-semibold" variant="secondary">
              Browse Problems
            </Button>
          </div>
        ) : (
          problems.map((problem: PlaylistProblem) => (
            <Link 
              key={problem.id}
              href={`/problems/${problem.id}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-blue-500/50 hover:shadow-lg transition-all gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors border border-border">
                  <Play className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 ml-1 transition-colors" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-foreground truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {problem.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${difficultyStyles[problem.difficulty] || difficultyStyles.MEDIUM}`}>
                      {problem.difficulty}
                    </span>
                    {problem.topic && (
                      <span className="text-[11px] font-medium text-muted-foreground truncate max-w-[150px]">
                        • {problem.topic}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pl-[56px] sm:pl-0 sm:shrink-0 text-sm">
                <div className="hidden md:flex items-center text-muted-foreground mr-4">
                  <Clock className="w-4 h-4 mr-1.5 opacity-50" />
                  <span className="font-medium text-xs">~20m</span>
                </div>
                <button
                  onClick={(e) => handleRemove(e, problem.id)}
                  disabled={removeMutation.isPending}
                  className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors ml-auto sm:ml-0"
                  title="Remove from playlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
