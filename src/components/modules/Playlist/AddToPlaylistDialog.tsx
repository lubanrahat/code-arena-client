"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlaylists, addProblemToPlaylist, removeProblemFromPlaylist, createPlaylist } from "@/app/playlists/_action";
import { Check, Loader2, Plus, ListMusic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddToPlaylistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  problemId: string;
}

interface Playlist {
  id: string;
  name: string;
  problems?: { problemId: string }[];
}

export default function AddToPlaylistDialog({ open, onOpenChange, problemId }: AddToPlaylistDialogProps) {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const { data: playlists, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const res = await getPlaylists();
      return res?.data || [];
    },
    enabled: open,
  });

  const addMutation = useMutation({
    mutationFn: (playlistId: string) => addProblemToPlaylist(playlistId, [problemId]),
    onSuccess: (res, playlistId) => {
      if (res?.error) {
        toast.error(res.message || "Failed to save to playlist");
      } else {
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
        queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
      }
    },
  });

  const removeMutation = useMutation({
    mutationFn: (playlistId: string) => removeProblemFromPlaylist(playlistId, problemId),
    onSuccess: (res, playlistId) => {
      if (res?.error) {
        toast.error(res.message || "Failed to remove from playlist");
      } else {
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
        queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (name: string) => createPlaylist({ name, description: "No description provided" }),
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.message || "Failed to create playlist");
      } else {
        toast.success("Playlist created");
        setNewTitle("");
        setIsCreating(false);
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
        
        // Auto add the problem to the newly created playlist
        if (res.data?.id) {
          addMutation.mutate(res.data.id);
        }
      }
    },
  });

  const handleToggle = (playlist: Playlist) => {
    // Check if the problem is already in the playlist
    const isAdded = playlist.problems?.some((p) => p.problemId === problemId);
    
    if (isAdded) {
      removeMutation.mutate(playlist.id);
    } else {
      addMutation.mutate(playlist.id);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createMutation.mutate(newTitle.trim());
  };

  // Helper function to figure out if it is added
  const isProblemInPlaylist = (playlist: Playlist) => {
    return playlist.problems?.some((p) => p.problemId === problemId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white dark:bg-neutral-950 border border-border">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-blue-500" />
            Save to Playlist
          </DialogTitle>
        </DialogHeader>

        <div className="px-2 pb-6 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-1">
              {playlists.map((playlist: Playlist) => {
                const added = isProblemInPlaylist(playlist);
                const isPending = addMutation.isPending && addMutation.variables === playlist.id || 
                                  removeMutation.isPending && removeMutation.variables === playlist.id;
                
                return (
                  <button
                    key={playlist.id}
                    onClick={() => handleToggle(playlist)}
                    disabled={isPending}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 rounded-lg transition-colors group text-left"
                  >
                    <span className={cn("font-medium text-sm flex-1 truncate", added ? "text-blue-600 dark:text-blue-400" : "text-foreground")}>
                      {playlist.name}
                    </span>
                    <div className="ml-4 shrink-0">
                      {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      ) : added ? (
                        <div className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded border-2 border-muted-foreground/30 group-hover:border-blue-500/50 transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {playlists?.length === 0 && !isLoading && !isCreating && (
            <div className="text-center p-6 text-sm text-muted-foreground">
              You don&apos;t have any playlists yet.
            </div>
          )}

          <div className="px-4 mt-2">
            {isCreating ? (
              <form onSubmit={handleCreateSubmit} className="flex items-center gap-2 mt-4 animate-in fade-in zoom-in-95 duration-200">
                <input
                  autoFocus
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Playlist name..."
                  className="flex-1 h-9 px-3 text-sm bg-muted/40 border border-border rounded-lg outline-none focus:border-blue-500"
                  disabled={createMutation.isPending}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={!newTitle.trim() || createMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsCreating(false)}
                  disabled={createMutation.isPending}
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-2 p-2 rounded-lg hover:bg-muted/30 w-full"
              >
                <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                Create new playlist
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
