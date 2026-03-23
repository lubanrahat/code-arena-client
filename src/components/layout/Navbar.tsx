"use client";

import * as React from "react";
import { useState } from "react";
import {
  Navbar as NavbarContainer,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  GraduationCap,
  HandHelping,
  LayoutDashboard,
  LogOut,
  Map,
  ScrollText,
  Sparkles,
  SquarePen,
  Terminal,
} from "lucide-react";

import { useAuthUser } from "@/hooks/useAuth";
import { useAuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import UserMenu from "@/components/layout/UserMenu";
import ThemeDropdown from "@/components/ui/theme-dropdown";
import { getRoleBadgeColor, getUserInitials } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const discoverItems = [
  {
    title: "Featured Courses",
    description: "Explore our curated coding courses to level up your skills.",
    href: "/courses",
    icon: GraduationCap,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Sheets Library",
    description: "Explore curated DSA and coding question sheets for practice.",
    href: "/sheets",
    icon: ScrollText,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Contribute",
    description: "Showcase your expertise and make an impact in the learning community.",
    href: "/contribute",
    icon: HandHelping,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const resourceItems = [
  {
    title: "Blogs",
    description: "Read insightful articles on coding and tech.",
    href: "/blogs",
    icon: SquarePen,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Roadmaps",
    description: "Step-by-step guides to master coding skills.",
    href: "/roadmaps",
    icon: Map,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    title: "Glossary",
    description: "Understand key coding terms and concepts.",
    href: "/glossary",
    icon: BookMarked,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    title: "AI Discussion",
    description: "Talk with AI, solve smarter, learn together.",
    href: "/ai-discussion",
    icon: Sparkles,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuthContext();
  const { user } = useAuthUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const dashboardLink = user?.role === "ADMIN" ? "/admin" : "/problems";

  return (
    <NavbarContainer>
      <NavBody>
        <Logo />
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-semibold")}>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-semibold")}>
                  <Link href="/problems">Practice</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-semibold">Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-1 lg:w-[600px] bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-white/20 dark:border-neutral-800/50 rounded-2xl shadow-2xl">
                    <div className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Explore Content</div>
                    {discoverItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                        color={item.color}
                        bg={item.bg}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-semibold">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-white/20 dark:border-neutral-800/50 rounded-2xl shadow-2xl">
                    <div className="md:col-span-2 mb-2 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Community & Tools</div>
                    {resourceItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                        color={item.color}
                        bg={item.bg}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-semibold")}>
                  <Link href="/pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeDropdown />
          {user ? (
            <UserMenu />
          ) : (
            <div className="flex gap-3">
              <NavbarButton
                className="border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-xl"
                href="/login"
              >
                Login
              </NavbarButton>
              <NavbarButton
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
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
          <div className="flex flex-col space-y-4 w-full h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
            <Link href="/" className="text-base font-bold px-2 py-1 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/problems" className="text-base font-bold px-2 py-1 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Practice</Link>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 px-2">
                <div className="h-px flex-1 bg-primary/10" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Discover</p>
                <div className="h-px flex-1 bg-primary/10" />
              </div>
              <div className="grid grid-cols-1 gap-1">
                {discoverItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-4 group p-3 rounded-2xl bg-primary/5 hover:bg-primary/10 active:scale-95 transition-all outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={cn("p-2 rounded-xl transition-transform group-hover:scale-110", item.bg, item.color)}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{item.title}</span>
                      <span className="text-xs text-muted-foreground/80 line-clamp-1">{item.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 px-2">
                <div className="h-px flex-1 bg-primary/10" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Resources</p>
                <div className="h-px flex-1 bg-primary/10" />
              </div>
              <div className="grid grid-cols-1 gap-1">
                {resourceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-4 group p-3 rounded-2xl bg-primary/5 hover:bg-primary/10 active:scale-95 transition-all outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={cn("p-2 rounded-xl transition-transform group-hover:scale-110", item.bg, item.color)}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{item.title}</span>
                      <span className="text-xs text-muted-foreground/80 line-clamp-1">{item.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/pricing" className="text-base font-bold px-2 py-1 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          </div>
          <div className="w-full flex items-center justify-between mt-auto pt-6 px-1">
            <span className="text-xs text-muted-foreground font-medium">Appearance</span>
            <ThemeDropdown />
          </div>
          <div className="border-t border-gray-100 dark:border-neutral-800/50 my-5 w-full" />
          <div className="flex flex-col gap-4 w-full pb-6">
            {user ? (
              <>
                <div className="w-full p-4 rounded-2xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md ${getRoleBadgeColor(user.role)}`}>
                      {getUserInitials((user as { userName?: string }).userName || user.email)}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold tracking-tight">{(user as { userName?: string }).userName || user.email}</p>
                      <p className="text-[11px] text-muted-foreground/80 font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>
                <Link
                  href={dashboardLink}
                  className="w-full px-4 py-3 rounded-2xl bg-primary/10 hover:bg-primary/20 text-center font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2 active:scale-95"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-red-200/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 flex items-center justify-center gap-2 rounded-2xl h-11"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <NavbarButton
                  className="w-full border border-primary/20 hover:border-primary/40 rounded-2xl h-11 text-sm font-bold"
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg text-center rounded-2xl h-11 text-sm font-bold active:scale-95 transition-transform"
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

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon?: React.ElementType;
  color?: string;
  bg?: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, href, icon: Icon, color, bg, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href!}
            className={cn(
              "group flex items-start gap-4 select-none rounded-xl p-3 leading-none no-underline outline-none transition-all hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98]",
              className
            )}
            {...props}
          >
            {Icon && (
              <div className={cn("p-2 rounded-lg transition-all shadow-sm group-hover:shadow-md group-hover:scale-110 shrink-0", bg, color)}>
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="text-sm font-bold leading-none tracking-tight group-hover:text-primary transition-colors">{title}</div>
              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground/90 font-medium">
                {children}
              </p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 px-2 py-1 text-lg font-bold text-neutral-800 dark:text-neutral-100"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg">
        <Terminal className="h-5 w-5 text-white" />
      </div>
      <span className="tracking-tight">CodeArena</span>
    </Link>
  );
};