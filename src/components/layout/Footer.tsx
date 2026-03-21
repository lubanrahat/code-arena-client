"use client";

import Link from "next/link";
import { Terminal, Github, Twitter, MessageSquare, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "Practice", href: "/problems" },
      { name: "Leaderboard", href: "#" },
      { name: "Contests", href: "#" },
      { name: "Discuss", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Getting Started", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Report Bug", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageSquare, href: "#", label: "Discord" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800/60 pt-20 pb-10 transition-colors">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start gap-6">
            <Link href="/" className="flex items-center gap-2.5 text-2xl font-bold text-zinc-900 dark:text-white group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <span className="tracking-tight">CodeArena</span>
            </Link>
            
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed">
              Elevating the world&apos;s engineering talent through expert-led practice, competitive challenges, and high-performance tools.
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href}
                      className="text-zinc-600 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-xs font-medium text-zinc-500">
             <p>&copy; 2026 CodeArena Inc.</p>
             <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-800 hidden md:block" />
             <p>All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">System Status: </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
