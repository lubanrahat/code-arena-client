import { Button } from "@/components/ui/button";
import { authServices } from "@/services/auth.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProblemList from "../components/modules/Problem/ProblemList";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["problems"],
    queryFn: authServices.allProblems,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <ProblemList /> */}
    </HydrationBoundary>
  );
}
