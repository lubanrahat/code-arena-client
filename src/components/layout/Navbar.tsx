"use client";

import { useState } from "react";
import {
  Navbar as NavbarContainer,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
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
import { LayoutDashboard, LogOut, Sparkles, Terminal } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuth";
import { useAuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuthContext();
  const { user } = useAuthUser();
  const router = useRouter();

  const navItems = [
    { name: "Practice", link: "/problems" },
    { name: "Leaderboard", link: "/" },
    { name: "Discuss", link: "/" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getUserInitials = (name: string): string => {
    return name?.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");
  };

  const getRoleBadgeColor = (role: string): string => {
    switch (role) {
      case "ADMIN":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      default:
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
    }
  };

  const dashboardLink = user?.role === "ADMIN" ? "/admin" : "/problems";

  return (
    <NavbarContainer>
      <NavBody>
        <Logo />
        <NavItems items={navItems} />
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
                  >
                    <div className={`absolute inset-0 ${getRoleBadgeColor(user.role)} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={(user as { imageUrl?: string }).imageUrl} />
                      <AvatarFallback className={`flex items-center justify-center h-full w-full text-white font-semibold text-sm ${getRoleBadgeColor(user.role)}`}>
                        {getUserInitials((user as { userName?: string }).userName || user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold leading-none">{(user as { userName?: string }).userName || user.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${getRoleBadgeColor(user.role)}`}>
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
          ) : (
            <div className="flex gap-3">
              <NavbarButton
                className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                href="/login"
              >
                Login
              </NavbarButton>
              <NavbarButton
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                href="/register"
              >
                Sign Up
              </NavbarButton>
            </div>
          )}
        </div>
      </NavBody>

      <MobileNav visible={mobileMenuOpen}>
        <MobileNavHeader>
          <Logo />
          <MobileNavToggle
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <NavItems
            items={navItems}
            className="flex flex-col space-x-0 space-y-4 relative w-full items-start"
          />
          <div className="border-t border-gray-100 dark:border-neutral-800 my-4 w-full" />
          <div className="flex flex-col gap-4 w-full">
            {user ? (
              <>
                <div className="w-full p-4 rounded-lg bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${getRoleBadgeColor(user.role)}`}>
                      {getUserInitials((user as { userName?: string }).userName || user.email)}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">{(user as { userName?: string }).userName || user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </div>
                <Link
                  href={dashboardLink}
                  className="w-full px-4 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-center font-medium transition-colors flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <NavbarButton
                  className="w-full border-2 border-primary/20 hover:border-primary/40"
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md text-center"
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </NavbarButton>
              </div>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </NavbarContainer>
  );
}

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 px-2 py-1 text-xl font-bold text-neutral-800 dark:text-neutral-100"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg">
        <Terminal className="h-5 w-5 text-white" />
      </div>
      <span className="tracking-tight">CodeArena</span>
    </Link>
  );
};