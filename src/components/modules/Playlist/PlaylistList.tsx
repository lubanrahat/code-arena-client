"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlaylists, deletePlaylist, createPlaylist } from "@/app/playlists/_action";
import { Plus, ListMusic, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Playlist {
  id: string;
  name: string;
  description?: string | null;
  problems?: unknown[];
}

export default function PlaylistList() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const { data: playlistsData, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const res = await getPlaylists();
      return res?.data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: { name: string; description: string }) => createPlaylist(payload),
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.message || "Failed to create playlist");
      } else {
        toast.success("Playlist created successfully!");
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
        setIsCreateOpen(false);
        setNewTitle("");
        setNewDescription("");
      }
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePlaylist(id),
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.message || "Failed to delete playlist");
      } else {
        toast.success("Playlist deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
      }
    },
  });

  const handleCreate = () => {
    if (!newTitle.trim()) {
      toast.error("Playlist name is required");
      return;
    }
    const finalDesc = newDescription.trim() || "No description provided";
    createMutation.mutate({ name: newTitle.trim(), description: finalDesc });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this playlist?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mt-28 sm:mt-32 relative z-20 w-full mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header section matching course format */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-neutral-950 dark:text-white leading-[0.85]">
            My <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Playlists</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium">
            Curate and organize problems to master specific topics efficiently.
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-linear-to-r from-blue-600 to-indigo-700 h-12 rounded-xl font-bold px-6 text-white shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider group"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Create Playlist
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-3xl bg-muted/60 animate-pulse" />
          ))}
        </div>
      ) : playlistsData.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 text-center rounded-[2.5rem] bg-white/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-xl backdrop-blur-xl">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center mb-6 shadow-inner">
            <ListMusic className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No Playlists Found</h3>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
            You haven&apos;t created any custom playlists yet. Create one to organize problems by topic or goal.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlistsData.map((playlist: Playlist) => (
            <Link 
              key={playlist.id} 
              href={`/playlists/${playlist.id}`}
              className="group block relative h-full w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-blue-500/50 hover:-translate-y-1"
            >
              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-8 h-full flex flex-col relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                    <ListMusic className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <button 
                    onClick={(e) => handleDelete(e, playlist.id)}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors z-20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 line-clamp-1">
                  {playlist.name}
                </h3>
                
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-6 flex-1">
                  {playlist.description || "No description"}
                </p>
                
                <div className="mt-auto pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black">{playlist.problems?.length || 0}</span>
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-2 hover:text-blue-500 transition-colors">
                      Problems
                    </span>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">New Playlist</DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <div className="space-y-2 block relative">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Playlist Name</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Dynamic Programming Masters"
                className="w-full px-4 py-3 bg-muted/50 border border-border border-zinc-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Description (Optional)</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="What is the focus of this playlist?"
                rows={3}
                className="w-full px-4 py-3 bg-muted/50 border border-border border-zinc-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none font-medium text-sm"
              />
            </div>
          </div>
          <DialogFooter className="border-t border-border mt-2 pt-4 bg-transparent sm:justify-end gap-2 px-0 bg-white dark:bg-black rounded-b-lg pb-0">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="rounded-lg px-6 h-11 border-border">
              Cancel
            </Button>
            <Button 
              onClick={handleCreate} 
              disabled={createMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 h-11 border-border shadow-md transition-all font-semibold border-0 hover:scale-105 active:scale-95 duration-200 ease-in-out"
            >
              {createMutation.isPending ? "Creating..." : "Save Playlist"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
