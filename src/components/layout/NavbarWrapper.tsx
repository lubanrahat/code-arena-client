"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on login and register pages
  const hideNavbar = pathname === "/login" || pathname === "/register" || pathname.startsWith("/admin");  
  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}
