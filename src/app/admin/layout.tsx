"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconUser, IconPlus } from "@tabler/icons-react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const links = [
        {
            label: "Create Problem",
            href: "/admin/create-problem",
            icon: <IconPlus size={20} />,
        },
        {
            label: "Users",
            href: "/admin/users",
            icon: <IconUser size={20} />,
        },
    ];

     const { user, loading } = useAuth("ADMIN");

     if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar>
                <SidebarBody>
                    <div className="flex flex-col gap-4">
                        {links.map((link, i) => (
                            <SidebarLink key={i} link={link} />
                        ))}
                    </div>
                </SidebarBody>
            </Sidebar>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50 dark:bg-neutral-900 overflow-auto">
                {children}
            </div>
        </div>
    );
}
