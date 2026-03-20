"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ThemeDropdown from "@/components/ui/theme-dropdown";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on login and register pages
  const hideNavbar = pathname === "/login" || pathname === "/register" || pathname.startsWith("/admin");  
  if (hideNavbar) {
    return (
      <div className="fixed right-4 top-4 z-50">
        <ThemeDropdown />
      </div>
    );
  }

  return <Navbar />;
}
