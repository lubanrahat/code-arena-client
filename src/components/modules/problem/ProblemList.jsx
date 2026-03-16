"use client";

import { authServices } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

export default function ProblemList() {
    const {data} = useQuery({
        queryKey: ["problems"],
        queryFn: authServices.allProblems,
    });
    console.log(data);
  return (
    <div>
      <h1>Problem List</h1>
      <ul>
        {data?.data?.map((problem) => (
          <li key={problem.id}>{problem.title}</li>
        ))}
      </ul>

    </div>
  );
}