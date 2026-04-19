import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { HeroCanvas } from "@/components/site/HeroCanvas";
import { Typewriter } from "@/components/site/Typewriter";
import { Marquee } from "@/components/site/Marquee";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Darji Dev — Full-Stack Developer in Ahmedabad" },
      { name: "description", content: "Building scalable digital experiences with React, Node.js, Supabase, and modern web tech." },
      { property: "og:title", content: "Darji Dev — Full-Stack Developer" },
      { property: "og:description", content: "Portfolio · Projects · Journal · Get in touch." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [featured, setFeatured] = useState<Project[]>([]);

  useEffect(() => {
    supabase.from("projects").select("*").eq("featured", true).order("display_order", { ascending: false }).limit(3)
      .then(({ data }) => setFeatured((data as Project[]) ?? []));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden noise">
        <HeroCanvas />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-xs font-mono">Available for opportunities · Ahmedabad, IN</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[0.95]"
            >
              Hi, I'm <span className="text-gradient">Darji</span>.
              <br />
              I build{" "}
              <Typewriter
                words={["scalable apps.", "delightful UIs.", "fast websites.", "useful tools."]}
                className="text-gradient"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Full-stack developer crafting clean, performant, end-to-end digital experiences.
              Currently exploring the intersection of React, Supabase, and thoughtful design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-glow hover:scale-[1.03] transition-transform"
              >
                View my work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Hire me
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-16 grid grid-cols-3 gap-6 md:gap-12 max-w-xl"
            >
              {[
                { v: "10+", l: "Projects shipped" },
                { v: "5+", l: "Tech stacks" },
                { v: "∞", l: "Cups of chai" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-semibold text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-accent to-transparent animate-pulse" />
        </div>
      </section>

      <Marquee />

      {/* SELECTED WORK */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <SectionHeading
          eyebrow="Selected Work"
          title="Things I've built recently."
          sub="A handful of projects that pushed me to learn, ship, and refactor mercilessly."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="aspect-[16/13] rounded-2xl bg-surface animate-pulse" />
              ))
            : featured.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>
        <Reveal delay={0.2} className="mt-12 text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium magnetic-link">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-accent opacity-10" />
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                I'm currently taking on freelance work and exploring full-time opportunities. Let's build something.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-7 py-3.5 text-sm font-medium text-accent-foreground shadow-glow"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
