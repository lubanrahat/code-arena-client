"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";

type ThemeOption = "system" | "light" | "dark";

export default function ThemeDropdown({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  // Prevent SSR/client icon mismatches: render a stable default on the first paint,
  // then switch to the real theme after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentTheme = useMemo<ThemeOption>(() => {
    if (!mounted) return "system";
    return (theme as ThemeOption) ?? "system";
  }, [mounted, theme]);

  const resolved = useMemo(() => {
    if (!mounted) return "light" as const;
    return (resolvedTheme ?? "light") as "light" | "dark";
  }, [mounted, resolvedTheme]);

  const Icon = useMemo(() => {
    if (!mounted) return Monitor;
    if (currentTheme === "system") return Monitor;
    return currentTheme === "dark" ? Moon : Sun;
  }, [currentTheme, mounted]);

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-border/60 bg-background/60 hover:bg-background/80 backdrop-blur"
            aria-label="Change theme"
          >
            <Icon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={currentTheme}
            onValueChange={(value) => setTheme(value as ThemeOption)}
          >
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          {mounted && (
            <div className="px-2 pb-2 text-xs text-muted-foreground">
              Preview: {resolved === "dark" ? "Dark" : "Light"}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

