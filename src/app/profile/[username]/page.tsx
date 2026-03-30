"use client";

import { useProfile } from "@/hooks/useUser";
import ProfileSidebar from "@/components/modules/Profile/ProfileSidebar";
import MyProgress from "@/components/modules/Profile/MyProgress";
import MyActivity from "@/components/modules/Profile/MyActivity";
import ProblemStats from "@/components/modules/Profile/ProblemStats";
import SkillAnalysis from "@/components/modules/Profile/SkillAnalysis";
import UserSubmissions from "@/components/modules/Profile/UserSubmissions";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { data: profileData, isLoading, isError } = useProfile(username);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 max-w-[1280px] mt-18">
        {/* Sidebar skeleton */}
        <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
          <Skeleton className="h-96 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        
        {/* Main Content skeleton */}
        <div className="flex-1 flex flex-col gap-4">
          <Skeleton className="h-8 w-40" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Skeleton className="h-48 w-full rounded-xl" />
             <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
             </div>
          </div>
          <Skeleton className="h-64 w-full rounded-xl mt-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
             <Skeleton className="h-48 w-full rounded-xl" />
             <Skeleton className="h-48 w-full rounded-xl" />
          </div>
          <Skeleton className="h-40 w-full rounded-xl mt-4" />
        </div>
      </div>
    );
  }

  if (isError || !profileData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-red-500 mb-2">User Not Found</h2>
        <p className="text-muted-foreground">We couldn&apos;t find a profile for @{username}.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 max-w-[1280px] mt-18">
      <ProfileSidebar user={profileData} stats={profileData.stats} isReadOnly={true} />
      
      <div className="flex-1 w-full flex flex-col min-w-0">
        <MyProgress stats={profileData.stats} />
        <MyActivity stats={profileData.stats} />
        <ProblemStats stats={profileData.stats} />
        <SkillAnalysis stats={profileData.stats} />
        
        <div className="mt-8 pt-8 border-t border-white/5">
          <UserSubmissions username={username} />
        </div>
      </div>
    </div>
  );
}
