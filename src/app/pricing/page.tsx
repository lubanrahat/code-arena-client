"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Rocket, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with coding practice",
    icon: Sparkles,
    iconColor: "text-blue-500",
    features: [
      "50 coding problems",
      "Basic code editor",
      "Community support",
      "Progress tracking",
      "5 submissions per day",
    ],
    cta: "Start Free",
    href: "/register",
    popular: false,
    gradient: "from-blue-500/10 to-indigo-500/10",
    borderGradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious developers preparing for interviews",
    icon: Rocket,
    iconColor: "text-indigo-500",
    features: [
      "Unlimited coding problems",
      "Advanced code editor with AI",
      "Priority support",
      "Detailed analytics",
      "Unlimited submissions",
      "Interview prep courses",
      "Mock interviews",
      "Solution explanations",
    ],
    cta: "Get Pro",
    href: "/register",
    popular: true,
    gradient: "from-indigo-500/10 to-violet-500/10",
    borderGradient: "from-indigo-500/50 to-violet-500/50",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For teams and organizations at scale",
    icon: Crown,
    iconColor: "text-violet-500",
    features: [
      "Everything in Pro",
      "Custom problem sets",
      "Team analytics dashboard",
      "SSO & advanced security",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Onboarding & training",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
    gradient: "from-violet-500/10 to-purple-500/10",
    borderGradient: "from-violet-500/20 to-purple-500/20",
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and offer invoicing for Enterprise customers.",
  },
  {
    question: "Is there a student discount?",
    answer: "Yes! Students get 50% off Pro plans. Contact us with your student email for verification.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee. If you're not satisfied, we'll refund your payment, no questions asked.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-950 relative overflow-x-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-8"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Simple Pricing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-zinc-900 dark:text-white mb-6 leading-tight"
          >
            Choose Your
            <br />
            <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Coding Journey
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium"
          >
            Start free, upgrade when you're ready. All plans include access to our world-class coding platform.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            <span className={cn("text-sm font-bold transition-colors", billingCycle === "monthly" ? "text-zinc-900 dark:text-white" : "text-zinc-400")}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative w-14 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors"
            >
              <motion.div
                animate={{ x: billingCycle === "monthly" ? 2 : 30 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-indigo-500 shadow-lg"
              />
            </button>
            <span className={cn("text-sm font-bold transition-colors", billingCycle === "yearly" ? "text-zinc-900 dark:text-white" : "text-zinc-400")}>
              Yearly
            </span>
            <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              Save 20%
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1.5 rounded-full bg-linear-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "relative h-full rounded-3xl p-8 transition-all duration-300",
                  "bg-white dark:bg-zinc-900 border",
                  plan.popular
                    ? "border-indigo-500/50 shadow-2xl shadow-indigo-500/20 scale-105"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                )}
              >
                {/* Background Gradient */}
                <div className={cn("absolute inset-0 rounded-3xl bg-linear-to-br opacity-50", plan.gradient)} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={cn("w-12 h-12 rounded-2xl bg-linear-to-br flex items-center justify-center mb-6", plan.gradient)}>
                    <plan.icon className={cn("w-6 h-6", plan.iconColor)} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-zinc-900 dark:text-white">
                        {plan.price === "Custom" ? plan.price : billingCycle === "yearly" && plan.price !== "$0" ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}` : plan.price}
                      </span>
                      {plan.price !== "Custom" && plan.price !== "$0" && (
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">/{billingCycle === "yearly" ? "year" : "month"}</span>
                      )}
                    </div>
                    {plan.price !== "Custom" && <p className="text-xs text-zinc-400 mt-1">{plan.period}</p>}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={plan.href}
                    className={cn(
                      "group relative w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold text-sm transition-all duration-300 mb-8",
                      plan.popular
                        ? "bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02]"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5", plan.popular ? "bg-indigo-500/20" : "bg-zinc-100 dark:bg-zinc-800")}>
                          <Check className={cn("w-3 h-3", plan.popular ? "text-indigo-500" : "text-zinc-600 dark:text-zinc-400")} />
                        </div>
                        <span className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              >
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-24"
        >
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Still have questions? We're here to help.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-900 dark:text-white font-bold text-sm transition-all duration-300"
          >
            Contact Support
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
