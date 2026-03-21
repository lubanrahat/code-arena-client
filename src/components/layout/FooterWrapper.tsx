"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";


export default function FooterWrapper() {
    const pathname = usePathname();

    // Hide navbar on login and register pages
    const hideFooter =
        pathname === "/login" ||
        pathname === "/register" ||
        pathname.startsWith("/admin")
    if (hideFooter) {
        return null;
    }
    return <Footer />;
}
