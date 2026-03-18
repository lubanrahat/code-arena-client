import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import QueryProviders from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

const inter = Inter({
  subsets: ["latin"], // required
  variable: "--font-inter", // optional if you want to use CSS variable
});

export const metadata: Metadata = {
  title: "CodeArena",
  description: "Advanced Agentic Coding Challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased font-sans">
        <AuthProvider>
          <QueryProviders>
            <ReactQueryStreamedHydration>
              <NavbarWrapper />
              {children}
            </ReactQueryStreamedHydration>
          </QueryProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
