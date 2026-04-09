import React from "react";
import { Shield } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">Legal Information</Badge>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-xl">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">Privacy Policy</h1>
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-6 max-w-2xl leading-relaxed">
            We are committed to protecting your personal information and your right to privacy. This policy explains what information we collect and how we use it.
          </p>
          <div className="mt-8 flex items-center gap-4 text-sm font-medium text-zinc-500">
            <span>Last Updated: <strong className="text-zinc-900 dark:text-white">April 12, 2026</strong></span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            <span>Effective: <strong className="text-zinc-900 dark:text-white">Immediately</strong></span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-12 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">1. Information We Collect</h2>
            <p>
              When you visit CodeArena, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. We refer to this automatically-collected information as &quot;Device Information.&quot;
            </p>
            <p>
              Additionally, when you create an account, participate in contests, or purchase a premium subscription, we collect information from you, including your name, email address, billing address, and payment information. We refer to this information as &quot;Order Information.&quot;
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">2. How We Use Your Information</h2>
            <p>
              We use the Order Information that we collect generally to fulfill any orders placed through the platform (including processing your payment information and providing you with invoices and/or order confirmations).
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700 dark:text-zinc-300">
              <li>Communicate with you regarding contests, leaderboards, and support.</li>
              <li>Screen our platform for potential risk or fraud.</li>
              <li>Provide you with information or advertising relating to our products or services.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">3. Sharing Your Personal Information</h2>
            <p>
              We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use modern analytics to help us understand how our customers use the Site.
            </p>
            <p>
              Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">4. Your Rights</h2>
            <p>
              If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us at <Link href="mailto:privacy@codearena.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@codearena.com</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
