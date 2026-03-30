import { Marquee } from "@/components/ui/marquee";

const logos = [
  { id: 1, name: "Google", img: "/work/google.png" },
  { id: 2, name: "Cisco", img: "/work/cisco.png" },
  { id: 3, name: "Programming-Hero", img: "/work/ph.png" },
  { id: 4, name: "Microsoft", img: "/work/microsoft.png" },
  { id: 5, name: "Netflix", img: "/work/netflix.png" },
  { id: 6, name: "Amazon", img: "/work/amazon.png" },
  { id: 7, name: "Nvidia", img: "/work/nvidia.png" },
  { id: 8, name: "PayPal", img: "/work/paypal.png" },
  { id: 9, name: "Oracle", img: "/work/oracle.png" },
  { id: 10, name: "Spotify", img: "/work/spotify.png" },
];

const LogoCard = ({ img, name }: { img: string; name: string }) => {
  return (
    <div className="group relative flex h-25 w-64 items-center justify-center overflow-hidden rounded-2xl dark:border-white/10 dark:bg-white/15">
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 dark:from-blue-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <img
        className="relative z-10 h-30 w-auto max-w-[80%] object-contain"
        alt={name}
        src={img}
      />
    </div>
  );
};

export function CareerOutcomes() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-32 mb-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center flex-col mb-20 px-4 text-center">
        <div className="inline-flex items-center rounded-full border border-blue-600/10 bg-blue-600/5 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-8 tracking-widest uppercase shadow-xs">
          Career Impact
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:bg-linear-to-b dark:from-white dark:to-white/50 dark:bg-clip-text dark:text-transparent">
          Where Our Learners Work
        </h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          From high-growth startups to Fortune 500 tech giants, our alumni are engineering the future at world-class organizations.
        </p>
      </div>

      <div className="relative w-full overflow-hidden px-4">
        <Marquee pauseOnHover className="[--duration:50s] [--gap:3rem] py-12">
          {logos.map((item) => (
            <LogoCard key={item.id} img={item.img} name={item.name} />
          ))}
        </Marquee>

        {/* Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background via-background/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background via-background/80 to-transparent z-10" />
      </div>
    </section>
  );
}
