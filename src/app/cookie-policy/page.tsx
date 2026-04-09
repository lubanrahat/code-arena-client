import React from "react";
import { Cookie } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">Legal Information</Badge>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-xl">
              <Cookie className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">Cookie Policy</h1>
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-6 max-w-2xl leading-relaxed">
            Understand how we use cookies and similar technologies to provide, customize, evaluate, improve, and secure our services.
          </p>
          <div className="mt-8 flex items-center gap-4 text-sm font-medium text-zinc-500">
            <span>Last Updated: <strong className="text-zinc-900 dark:text-white">January 10, 2026</strong></span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            <span>Effective: <strong className="text-zinc-900 dark:text-white">Immediately</strong></span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-12 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">1. What are cookies?</h2>
            <p>
              Cookies are small files—usually consisting of letters and numbers—placed on your computer, tablet, phone, or similar device when you use that device to visit a website. Cookies are widely used by website owners to make their websites operate, work more efficiently, and provide analytical information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">2. How we use cookies</h2>
            <p>
              CodeArena uses cookies for several reasons, like helping us see which features are most popular, counting visitors to a page, improving our users&apos; experience, keeping our services secure, and generally providing you with a better, more intuitive, and satisfying experience. The cookies we may use generally fall into one of the following categories.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">3. Types of cookies used</h2>
            <div className="space-y-6 mt-6">
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-100 dark:border-zinc-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Essential Cookies</h3>
                <p className="text-sm">These cookies are strictly necessary to provide you with services available through our platform and to use some of its features, such as access to secure areas.</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-100 dark:border-zinc-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Performance & Functionality Cookies</h3>
                <p className="text-sm">These cookies are used to enhance the performance and functionality of our platform but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-100 dark:border-zinc-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Analytics & Customization Cookies</h3>
                <p className="text-sm">These cookies collect information that is used either in aggregate form to help us understand how our platform is being used or how effective our marketing campaigns are, or to help us customize our platform for you.</p>
              </div>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">4. Managing cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
