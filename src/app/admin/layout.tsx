"use client";
import React, { useState } from "react";
import { IconArrowLeft, IconUserBolt } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Code2, DollarSign, Plus, Terminal } from "lucide-react";
import { LoaderOne } from "@/components/ui/loader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    logout();
    router.push("/login");
  };

  const links = [
    {
      label: "Create Problem",
      href: "/admin/create-problem",
      icon: (
        <Plus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Problems",
      href: "/admin/problems",
      icon: (
        <Code2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Premium Users",
      href: "/admin/premium-users",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-amber-500 dark:text-amber-400" />
      ),
    },

    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: handleLogout,
    },
  ];
  const [open, setOpen] = useState(false);

  const { user, loading } = useAuth("ADMIN");

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <LoaderOne />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 flex w-full h-full flex-col overflow-hidden bg-gray-100 md:flex-row dark:bg-neutral-800",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user.firstName + " " + user.lastName,
                href: "/profile",
                icon: (
                  <Image
                    src={user.imageUrl as string}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 p-4 md:p-6 overflow-auto bg-white dark:bg-neutral-900">
        {children}
      </div>
    </div>
  );
}

// export const Logo = () => {
//   return (
//     <Link
//       href="/"
//       className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
//     >
//       <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium whitespace-pre text-black dark:text-white"
//       >
//         Code Arena
//       </motion.span>
//     </Link>
//   );
// };

export const Logo = () => {
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

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="flex h-8 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg">
        <Terminal className="h-5 w-5 text-white" />
      </div>
    </Link>
  );
};
