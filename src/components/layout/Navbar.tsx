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
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Terminal } from "lucide-react";

import { useAuthUser } from "@/hooks/useAuth";
import { useAuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import UserMenu from "@/components/layout/UserMenu";
import ThemeDropdown from "@/components/ui/theme-dropdown";
import { getRoleBadgeColor, getUserInitials } from "@/lib/utils";



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

  const dashboardLink = user?.role === "ADMIN" ? "/admin" : "/problems";


  return (
    <NavbarContainer>
      <NavBody>
        <Logo />
        <NavItems items={navItems} />
        <div className="flex items-center space-x-3">
          <ThemeDropdown />
          {user ? (
            <UserMenu />
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
          <div className="w-full flex items-center justify-end pr-1">
            <ThemeDropdown />
          </div>
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