"use client";

import React from "react";
import { Bug, Send, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportBugPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center py-20 px-6">
      
      <div className="text-center mb-10 max-w-lg">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10 mb-6">
          <Bug className="h-8 w-8 text-red-600 dark:text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
          Report a Bug
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Something not working correctly? Let us know. We usually squash bugs within 24 hours of them being reported.
        </p>
      </div>

      <Card className="w-full max-w-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/50">
        <CardContent className="p-8 md:p-10">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-zinc-900 dark:text-white">Email Address</label>
                <Input type="email" placeholder="you@example.com" className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-zinc-900 dark:text-white">Issue Type</label>
                <select className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-shadow">
                  <option>Visual / UI Bug</option>
                  <option>Code Execution Error</option>
                  <option>Account / Billing</option>
                  <option>Performance Issue</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-900 dark:text-white">Subject</label>
              <Input type="text" placeholder="Brief description of the issue" className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-900 dark:text-white">Steps to Reproduce</label>
                <span className="text-xs text-zinc-500">Optional but helpful</span>
              </div>
              <Textarea 
                placeholder="1. Go to the dashboard...&#10;2. Click on..." 
                className="min-h-[120px] bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 resize-y p-4"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-900 dark:text-white">Attachments</label>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                 <p className="text-sm text-zinc-500">Drag & drop screenshots or click to browse files.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
               <div className="flex items-center text-amber-600 dark:text-amber-500 text-sm">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  We may email you for clarification.
               </div>
               <Button type="submit" size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-8 h-12 shadow-lg shadow-red-500/20">
                 <Send className="w-4 h-4 mr-2" />
                 Submit Report
               </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
