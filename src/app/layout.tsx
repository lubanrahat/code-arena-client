import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import QueryProviders from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";

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
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="antialiased font-sans h-full">
        <ThemeProvider>
          <AuthProvider>
            <QueryProviders>
              <NavbarWrapper />
              {children}
              <FooterWrapper />
            </QueryProviders>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
