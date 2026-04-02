import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, Home, TerminalSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 blur-[60px] bg-blue-500/30 rounded-full w-48 h-48 mx-auto" />
        <div className="relative z-10 flex items-center justify-center w-32 h-32 rounded-full bg-blue-500/10 border border-blue-500/20 mx-auto">
          <SearchX className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-background border border-border shadow-lg px-4 py-1.5 rounded-full text-xl font-bold text-foreground z-20">
          404
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
        Page Not Found
      </h1>
      
      <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
        Oops! We couldn&apos;t find the page you were looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-full sm:w-auto px-8">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full w-full sm:w-auto px-8">
          <Link href="/problems">
            <TerminalSquare className="w-4 h-4 mr-2" />
            Go to Problems
          </Link>
        </Button>
      </div>
    </div>
  );
}
