import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPlaylistDetails } from "../_action";
import PlaylistDetail from "@/components/modules/Playlist/PlaylistDetail";

export const dynamic = "force-dynamic";

export default async function PlaylistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["playlist", id],
    queryFn: async () => {
      const res = await getPlaylistDetails(id);
      return res?.data || null;
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-b bg-white dark:bg-black overflow-hidden relative">
      <div className="absolute top-[0%] left-[50%] -translate-x-[50%] w-full h-[30%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlaylistDetail playlistId={id} />
      </HydrationBoundary>
    </div>
  );
}
