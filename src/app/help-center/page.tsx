import React from "react";
import { LifeBuoy, Mail, MessageSquare, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HelpCenterPage() {
  const faqs = [
    {
      question: "How do rating points work?",
      answer: "Rating points are calculated using an Elo-based system. Participating in rated contests and solving problems faster than your peers will increase your rating. Abandoning a contest or submitting incorrect attempts may lower it."
    },
    {
      question: "Are the problem solutions available?",
      answer: "Yes! After you solve a problem, or if you choose to forfeit the points, you can view the editorial solution and other users' accepted submissions in the Discuss tab."
    },
    {
      question: "What programming languages are supported?",
      answer: "We currently support Python, JavaScript, TypeScript, Java, C++, Go, and Rust. All code runs in a secure Docker container with specific time and memory limitations."
    },
    {
      question: "Can I use CodeArena for technical interviews?",
      answer: "Absolutely. CodeArena has an upcoming specific 'Interview Mode' that lets you pair program with a candidate or an interviewer in real-time."
    },
    {
      question: "How can I report a bug or issue?",
      answer: "You can report any bugs via the 'Report Bug' page linked in the footer, or directly send an email to support@codearena.com."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-900 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
            <LifeBuoy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            How can we help?
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Search our knowledge base or browse frequently asked questions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl -mt-8 relative z-20">
         <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-200 dark:border-zinc-800 p-2 flex items-center">
           <input 
              type="text" 
              className="w-full bg-transparent border-none px-6 py-4 text-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-0 placeholder-zinc-400" 
              placeholder="Search for articles..."
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-colors">
              Search
            </button>
         </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl mt-24">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6">
              <AccordionTrigger className="text-lg font-semibold text-zinc-900 dark:text-white hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">Still need help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Link href="mailto:support@codearena.com" className="block">
                <Card className="hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors h-full bg-transparent border-zinc-200 dark:border-zinc-800 border-2">
                  <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Email Support</h3>
                      <p className="text-zinc-500 text-sm mt-1">Get an answer within 24 hours.</p>
                    </div>
                  </CardContent>
                </Card>
             </Link>
             <Link href="#" className="block">
                <Card className="hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-colors h-full bg-transparent border-zinc-200 dark:border-zinc-800 border-2">
                  <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Community Discord</h3>
                      <p className="text-zinc-500 text-sm mt-1">Chat with other users and staff in real-time.</p>
                    </div>
                  </CardContent>
                </Card>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
