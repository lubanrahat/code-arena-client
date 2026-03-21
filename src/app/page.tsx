import Hero from "@/components/modules/Landing/Hero";
import Features from "@/components/modules/Landing/Features";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-950 relative overflow-x-hidden">
      <main className="relative z-10">
        <Hero />
        <Features />
        
        {/* Simple CTA Section before footer */}
        <section className="py-24 bg-blue-600">
           <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to level up your coding?
              </h2>
              <p className="text-blue-100 mb-10 max-w-2xl mx-auto">
                Join thousands of developers and experts. Start your journey towards becoming a master programmer today.
              </p>
              <Link 
                href="/register" 
                className="inline-flex h-12 px-10 items-center justify-center rounded-full bg-white text-blue-600 font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform"
              >
                Create Free Account
              </Link>
           </div>
        </section>
      </main>
    </div>
  );
}


