"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapPin, GraduationCap, LinkIcon, Crown } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useUpdateProfile } from "@/hooks/useUser";
import { toast } from "sonner";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";

interface ProfileSidebarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
}

export default function ProfileSidebar({ user, stats }: ProfileSidebarProps) {
  console.log("Rendering ProfileSidebar with user:", user);
  const joinDate = user?.createdAt
    ? format(new Date(user.createdAt), "MMM yyyy")
    : "Unknown";
  const { profile } = user || {};
  const updateProfile = useUpdateProfile();
  const [open, setOpen] = useState(false);

  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");

  const [location, setLocation] = useState<string>(profile?.location || "");
  const [institution, setInstitution] = useState<string>(
    profile?.institution || "",
  );
  const [website, setWebsite] = useState<string>(profile?.website || "");
  const [github, setGithub] = useState<string>(profile?.github || "");
  const [linkedin, setLinkedin] = useState<string>(profile?.linkedin || "");
  const [twitter, setTwitter] = useState<string>(profile?.twitter || "");

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) return;
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setLocation(profile?.location || "");
    setInstitution(profile?.institution || "");
    setWebsite(profile?.website || "");
    setGithub(profile?.github || "");
    setLinkedin(profile?.linkedin || "");
    setTwitter(profile?.twitter || "");
  };

  const isSaving = updateProfile.isPending;
  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        location: location || undefined,
        institution: institution || undefined,
        website: website || undefined,
        github: github || undefined,
        linkedin: linkedin || undefined,
        twitter: twitter || undefined,
      });
      setOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full lg:w-72 shrink-0">
      <Card className="w-full border-border bg-card shadow-xs">
        <CardContent className="p-6 flex flex-col items-start gap-4">
          <div className="flex items-center gap-4 w-full">
            <Avatar className="h-20 w-20 border-2 border-primary/10">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                {user?.firstName?.charAt(0) || user?.userName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <h2 className="text-xl font-bold font-sans text-foreground truncate">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.userName}
              </h2>
              <p className="text-sm font-medium text-muted-foreground mt-0.5 truncate">
                Global Rank #{stats?.globalRank?.toLocaleString() || "---"}
              </p>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                Since: {joinDate}
              </p>
            </div>
          </div>

          {/* {user?.isPremium && (
            <div className="w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 flex items-center gap-2.5">
              <Crown className="h-4 w-4 text-amber-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">💎 Pro Member</span>
                {user.subscriptionPlan && (
                  <span className="text-[11px] text-muted-foreground capitalize">{user.subscriptionPlan} plan</span>
                )}
              </div>
            </div>
          )} */}

          {user?.isPremium ? (
            <div className="w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 flex items-center gap-2.5">
              <Crown className="h-4 w-4 text-amber-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  💎 Pro Member
                </span>
                {user.subscriptionPlan && (
                  <span className="text-[11px] text-muted-foreground capitalize">
                    {user.subscriptionPlan} plan
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full relative group mt-1">
              <div className="absolute -inset-0.5 bg-linear-to-r from-violet-600 via-fuchsia-600 to-orange-600 rounded-xl blur-sm opacity-40 group-hover:opacity-75 transition duration-500"></div>
              <Link href="/pricing" className="relative w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all shadow-xl overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-linear-to-r from-violet-600/10 to-orange-600/10 pointer-events-none"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-orange-500 text-white shadow-[inset_0px_1px_2px_rgba(255,255,255,0.4)]">
                    <Crown className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white leading-tight drop-shadow-sm">Upgrade to Pro</span>
                    <span className="text-[10px] text-white/60 font-medium tracking-wider uppercase mt-0.5">Unlock all features</span>
                  </div>
                </div>
                <div className="relative z-10 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-transform">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </Link>
            </div>
          )}

          <div className="w-full space-y-3 mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{profile?.location || "Not Set"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {profile?.institution || "Not Set"}
              </span>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm py-4">
              <div className="flex flex-col items-center">
                <span className="font-bold text-foreground">0</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Followers
                </span>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-foreground">0</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Following
                </span>
              </div>
            </div>
          </div>

          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full rounded-md font-medium border-primary/20 text-primary hover:bg-primary/5 transition-colors"
              >
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Edit your profile</DialogTitle>
              </DialogHeader>

              <form
                className="grid gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSave();
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                  />
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                  />
                </div>

                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                />
                <Input
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Institution / University"
                />
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website"
                />
                <Input
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="GitHub"
                />
                <Input
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="LinkedIn"
                />
                <Input
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="Twitter"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save profile"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card className="w-full border-border bg-card shadow-xs">
        <CardContent className="p-5 flex flex-col gap-4">
          <h3 className="font-bold text-base text-foreground">My Stats</h3>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Global Rank</span>
              <span className="font-medium text-foreground">
                {stats?.globalRank?.toLocaleString() || "---"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">University Rank</span>
              <span className="font-medium text-foreground">
                {stats?.universityRank?.toLocaleString() || "---"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Time Spent</span>
              <span className="font-medium text-foreground">
                {stats?.timeSpent || "0 hours"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Total Problems Solved
              </span>
              <span className="font-medium text-foreground">
                {stats?.totalProblemsSolved || 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {profile?.website && (
        <div className="flex justify-center">
          <div className="h-10 w-10 rounded-full bg-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <LinkIcon className="h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  );
}
