import React from "react";
import { Scale } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">Legal Information</Badge>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-xl">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">Terms of Service</h1>
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-6 max-w-2xl leading-relaxed">
            Please read these Terms of Service carefully before using our platform. These terms govern your use of CodeArena.
          </p>
          <div className="mt-8 flex items-center gap-4 text-sm font-medium text-zinc-500">
            <span>Last Updated: <strong className="text-zinc-900 dark:text-white">February 24, 2026</strong></span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            <span>Effective: <strong className="text-zinc-900 dark:text-white">Immediately</strong></span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-12 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CodeArena, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using CodeArena&apos;s particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
            <p>
              Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">2. User Account and Security</h2>
            <p>
              To access certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the platform and for any activities or actions under your password. You agree not to disclose your password to any third party.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">3. Acceptable Use Policy</h2>
            <p>
              You agree not to use the platform to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700 dark:text-zinc-300">
              <li>Upload, post, transmit, or otherwise make available any content that is unlawful, harmful, threatening, abusive, or harassing.</li>
              <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
              <li>Attempt to cheat or manipulate the leaderboard, contests, or challenge submissions.</li>
              <li>Interfere with or disrupt the platform or servers or networks connected to the platform.</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">4. Intellectual Property</h2>
            <p>
              The platform and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of CodeArena and its licensors. The platform is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            <p>
              For any questions regarding these Terms, please contact us at <Link href="mailto:legal@codearena.com" className="text-blue-600 dark:text-blue-400 hover:underline">legal@codearena.com</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
