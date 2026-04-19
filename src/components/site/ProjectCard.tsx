import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

export type ProjectCardData = {
  slug: string;
  title: string;
  tagline: string;
  tech_stack: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
};

export function ProjectCard({ p, index = 0 }: { p: ProjectCardData; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to="/projects/$slug" params={{ slug: p.slug }} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-glow">
          {/* Cover */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-accent opacity-90 transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `radial-gradient(circle at ${20 + index * 15}% ${30 + index * 10}%, oklch(0.78 0.18 220 / 0.6), transparent 60%), radial-gradient(circle at ${80 - index * 10}% ${70 - index * 5}%, oklch(0.7 0.22 300 / 0.5), transparent 55%)`,
              }}
            />
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-6xl md:text-7xl font-bold text-foreground/15 tracking-tighter select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            {p.featured && (
              <span className="absolute top-4 left-4 glass px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider">
                ★ Featured
              </span>
            )}
            <div className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full glass-strong opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-0 -rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold tracking-tight mb-1.5">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tech_stack.slice(0, 4).map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md bg-secondary text-[11px] font-mono text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-accent magnetic-link">View case study →</span>
              {p.github_url && (
                <a
                  href={p.github_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
