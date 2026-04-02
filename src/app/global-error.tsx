'use client'; // Error boundaries must be Client Components

import "./globals.css";
import { Inter } from "next/font/google";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeProvider from "@/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="antialiased font-sans h-full">
        <ThemeProvider>
          <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background text-foreground">
            <div className="relative mb-8">
              <div className="absolute inset-0 blur-[60px] bg-red-500/30 rounded-full w-48 h-48 mx-auto" />
              <div className="relative z-10 flex items-center justify-center w-32 h-32 rounded-full bg-red-500/10 border border-red-500/20 mx-auto">
                <AlertTriangle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-background border border-border shadow-lg px-4 py-1.5 rounded-full text-xl font-bold text-foreground z-20">
                500
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
              Something went wrong!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
              We&apos;ve encountered an unexpected critical error. Our team has been notified. 
              Please try again or return to the homepage.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button onClick={() => reset()} size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full w-full sm:w-auto px-8">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full w-full sm:w-auto px-8">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}