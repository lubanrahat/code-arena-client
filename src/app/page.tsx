import Link from "next/link";
import { Code2, ShieldCheck, Sparkles, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Diagonal grid background (bottom-left fade) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-90 dark:opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 49%, #6b7280 49%, #6b7280 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, #6b7280 49%, #6b7280 51%, transparent 51%)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

      <main className="relative pt-24">
        <section className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-muted-foreground shadow-sm">
                <Sparkles className="h-4 w-4" />
                <span>Advanced agentic coding challenges</span>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Code smarter. Practice harder.
              </h1>

              <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                Solve algorithmic problems, write clean solutions, and improve with
                feedback designed for real-world coding interviews.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <Link href="/problems">Practice Problems</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/login">Login to Compete</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5">
                  <Trophy className="h-4 w-4" />
                  <span>Progress tracking</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5">
                  <Code2 className="h-4 w-4" />
                  <span>Write and run code</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure execution</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="rounded-2xl bg-card/70 backdrop-blur">
                <CardHeader>
                  <CardTitle>What you do here</CardTitle>
                  <CardDescription>
                    A smooth flow from problem to solution to progress.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-sm font-medium">1) Pick a challenge</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Start with problems tailored for consistent practice.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-sm font-medium">2) Implement a solution</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Write code, run tests, and iterate until it works.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-sm font-medium">3) Improve with feedback</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Learn faster by reviewing outcomes and patterns.
                    </p>
                  </div>
                  <div className="pt-1">
                    <Button asChild className="w-full" variant="secondary">
                      <Link href="/problems">Get started</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-7xl px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Why CodeArena</h2>
              <p className="mt-2 text-muted-foreground">
                Built for focus, momentum, and measurable improvement.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Agentic problem solving</CardTitle>
                <CardDescription>
                  Think through approaches faster with structured guidance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Clear steps from idea to implementation</li>
                  <li>Actionable feedback loop</li>
                  <li>Better iteration velocity</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Clean coding practice</CardTitle>
                <CardDescription>
                  Train habits that translate to interviews and real projects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Consistent test-driven workflow</li>
                  <li>Readable, maintainable solutions</li>
                  <li>Progress you can actually see</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Competitive momentum</CardTitle>
                <CardDescription>
                  Improve steadily with leaderboard-driven motivation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Stay consistent with practice goals</li>
                  <li>Challenge yourself with rankings</li>
                  <li>Share your wins with the community</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="mx-auto mt-16 w-full max-w-7xl px-6 pb-10">
          <div className="flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CodeArena. Practice daily, improve faster.
            </p>
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link href="/problems">Explore Problems</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/register">Create account</Link>
              </Button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
