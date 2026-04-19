import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { Code2, Database, Palette, Wrench } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Darji Dev" },
      { name: "description", content: "About Darji Dev — full-stack developer based in Ahmedabad. Skills, journey, and what I'm building next." },
      { property: "og:title", content: "About — Darji Dev" },
      { property: "og:description", content: "Full-stack developer based in Ahmedabad." },
    ],
  }),
  component: AboutPage,
});

const SKILLS = [
  { icon: Code2, title: "Languages", items: ["C", "C++", "JavaScript", "TypeScript", "Python"] },
  { icon: Palette, title: "Frontend & Design", items: ["React", "Next.js", "Tailwind CSS", "UI / UX", "Framer Motion"] },
  { icon: Database, title: "Backend & Data", items: ["Node.js", "Supabase", "PostgreSQL", "MongoDB", "REST APIs"] },
  { icon: Wrench, title: "Tools & Practice", items: ["Git", "Testing (Vitest / Jest)", "Vite", "Figma", "Linux"] },
];

const TIMELINE = [
  { year: "2026", title: "Building in public", org: "Freelance · Ahmedabad", desc: "Shipping side projects, contributing to open source, exploring AI-assisted dev workflows." },
  { year: "2025", title: "Self-directed full-stack journey", org: "Independent", desc: "Deep dives into React, Supabase, system design, and modern tooling. Built and shipped end-to-end products." },
  { year: "2024", title: "Programming foundations", org: "C / C++ / Python", desc: "Built fluency in fundamentals — data structures, problem solving, and clean code habits." },
  { year: "2023", title: "First lines of code", org: "Where it began", desc: "Discovered the joy of building things people use. Never looked back." },
];

function AboutPage() {
  return (
    <>
      <section className="container mx-auto px-4 pt-32 pb-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">About</span>
          <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.05] max-w-4xl">
            A fresher with the curiosity of a <span className="text-gradient">ten-year veteran</span>.
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-2 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm <span className="text-foreground font-medium">Darji</span> — a self-taught full-stack developer based in Ahmedabad, India. I'm at the start of my career, but I treat every project like it's going to production tomorrow.
            </p>
            <p>
              I'm most at home moving between the database, the API layer, and the pixel-level details of the UI. I care about code that's easy to read six months later, interfaces that respect the user's time, and shipping things that actually work.
            </p>
            <p>
              When I'm not coding, I'm reading about design systems, sketching app ideas, or learning whatever new tool the React ecosystem decided we needed this week.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass rounded-2xl p-6 space-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Location</p>
                <p className="font-medium">Ahmedabad, India</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Status</p>
                <p className="font-medium">Open to freelance & full-time</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Focus</p>
                <p className="font-medium">React · Supabase · UI/UX</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Currently learning</p>
                <p className="font-medium">System design, AI-assisted dev</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section className="container mx-auto px-4 py-24">
        <SectionHeading eyebrow="Skills" title="The toolkit." sub="What I reach for, day to day." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group h-full glass rounded-2xl p-6 hover:border-accent/50 transition-colors">
                <s.icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="font-semibold mb-3">{s.title}</h3>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground font-mono">— {item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container mx-auto px-4 py-24">
        <SectionHeading eyebrow="Journey" title="A short timeline." />
        <div className="relative max-w-3xl">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className={`relative flex gap-6 mb-10 md:mb-14 md:w-1/2 ${i % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10 md:text-left"}`}>
                <div className={`absolute top-1.5 left-4 md:left-auto md:right-auto h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-accent shadow-glow ${i % 2 === 0 ? "md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"}`} />
                <div className="ml-10 md:ml-0">
                  <p className="font-mono text-xs text-accent">{t.year}</p>
                  <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{t.org}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
