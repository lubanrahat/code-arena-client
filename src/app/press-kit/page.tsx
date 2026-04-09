import React from "react";
import { Download, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      {/* Hero */}
      <div className="pt-32 pb-20 px-6 text-center border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Press Kit
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Everything you need to write about CodeArena. Download our logos, brand assets, and screenshots.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-5xl mt-20">
        <div className="space-y-16">
          {/* Logo Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Our Logo</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">Please do not alter the logo&apos;s proportions or color.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Dark Background Logo */}
               <div className="bg-zinc-900 rounded-3xl p-12 flex flex-col items-center justify-center border border-zinc-800">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-xl">
                      <Terminal className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-4xl font-bold tracking-tight">CodeArena</span>
                  </div>
                  <Button variant="outline" className="mt-12 bg-white/10 hover:bg-white/20 text-white border-white/20 border">
                    <Download className="w-4 h-4 mr-2" />
                    Download SVG
                  </Button>
               </div>

               {/* Light Background Logo */}
               <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center border border-zinc-200 shadow-sm">
                  <div className="flex items-center gap-4 text-zinc-900">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/20">
                      <Terminal className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-4xl font-bold tracking-tight">CodeArena</span>
                  </div>
                  <Button variant="outline" className="mt-12 hover:bg-zinc-50 border-zinc-200">
                    <Download className="w-4 h-4 mr-2" />
                    Download SVG
                  </Button>
               </div>
            </div>
          </section>

          {/* Color Palette */}
          <section>
             <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Brand Colors</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">Our primary colors represent speed, trust, and intelligence.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="w-full h-32 rounded-2xl bg-blue-600 shadow-inner"></div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white">Primary Blue</div>
                  <div className="text-sm text-zinc-500 font-mono mt-1">#2563EB</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-32 rounded-2xl bg-indigo-600 shadow-inner"></div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white">Deep Indigo</div>
                  <div className="text-sm text-zinc-500 font-mono mt-1">#4F46E5</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-32 rounded-2xl bg-zinc-950 shadow-inner border border-zinc-800"></div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white">Pitch Black</div>
                  <div className="text-sm text-zinc-500 font-mono mt-1">#09090B</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-32 rounded-2xl bg-white shadow-inner border border-zinc-200"></div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white">Pure White</div>
                  <div className="text-sm text-zinc-500 font-mono mt-1">#FFFFFF</div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Details */}
          <section className="bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Request Media Access</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-8">
              Need access to our platform for a review? Want to interview our founders? Reach out to our press team directly.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              Contact Press Team
            </Button>
          </section>

        </div>
      </div>
    </div>
  );
}
