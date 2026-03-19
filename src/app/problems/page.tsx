import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { allProblems } from "./_action";
import ProblemList from "@/components/modules/Problem/ProblemList";

export default async function ProblemsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["problems"],
    queryFn: allProblems,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
      <ProblemList   />
    </HydrationBoundary>
    </div>
  );
}
