"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Sparkles, User } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuth";
import { useAuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { getRoleBadgeColor, getUserInitials } from "@/lib/utils";

export default function UserMenu() {
  const { logout } = useAuthContext();
  const { user } = useAuthUser();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const dashboardLink = user.role === "ADMIN" ? "/admin" : "/problems";

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
          >
            <div
              className={`absolute inset-0 ${getRoleBadgeColor(
                user.role,
              )} opacity-10 group-hover:opacity-20 transition-opacity`}
            />
            <Avatar className="h-10 w-10">
              <AvatarImage src={(user as { imageUrl?: string }).imageUrl} />
              <AvatarFallback
                className={`flex items-center justify-center h-full w-full text-white font-semibold text-sm ${getRoleBadgeColor(
                  user.role,
                )}`}
              >
                {getUserInitials(
                  (user as { userName?: string }).userName || user.email,
                )}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col">
                <p className="text-sm font-semibold leading-none">
                  {(user as { userName?: string }).userName || user.email}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {user.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${getRoleBadgeColor(
                    user.role,
                  )}`}
                >
                  <Sparkles className="h-3 w-3" />
                  {user.role}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push(dashboardLink)}
              className="cursor-pointer py-2"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer py-2"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-red-600 py-2"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
