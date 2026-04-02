import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPlaylists } from "./_action";
import PlaylistList from "@/components/modules/Playlist/PlaylistList";

export const dynamic = "force-dynamic";

export default async function PlaylistsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const res = await getPlaylists();
      return res?.data || [];
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b bg-white dark:bg-black overflow-hidden relative">
      <div className="absolute top-[0%] left-[50%] -translate-x-[50%] w-[100%] h-[30%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlaylistList />
      </HydrationBoundary>
    </div>
  );
}
