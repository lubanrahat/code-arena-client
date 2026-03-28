import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { allProblems } from "./_action";
import ProblemList from "@/components/modules/Problem/ProblemList";

export const dynamic = "force-dynamic";

export default async function ProblemsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["problems"],
    queryFn: allProblems,
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-background to-muted/20 mt-18">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProblemList />
      </HydrationBoundary>
    </div>
  );
}
