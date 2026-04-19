import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/lib/types";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Darji Dev` },
      { property: "og:title", content: `${params.slug} — Case study by Darji Dev` },
    ],
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 pt-40 pb-24 text-center">
      <h1 className="text-3xl font-semibold">Project not found</h1>
      <Link to="/projects" className="mt-4 inline-block text-accent magnetic-link">← Back to projects</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-4 pt-40 pb-24 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("projects").select("*").eq("slug", slug).maybeSingle()
      .then(({ data }) => {
        setProject(data as Project | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 pt-40 pb-24"><div className="h-96 rounded-2xl bg-surface animate-pulse" /></div>;
  if (!project) throw notFound();

  return (
    <article className="container mx-auto px-4 pt-32 pb-24 max-w-4xl">
      <Reveal>
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 magnetic-link">
          <ArrowLeft className="h-4 w-4" /> Back to all projects
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.featured && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">★ Featured</span>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-[1.05]">
          {project.title}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">{project.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech_stack.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full glass text-xs font-mono">{t}</span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-glow">
              Live demo <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium hover:bg-secondary">
              <Github className="h-4 w-4" /> Source
            </a>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 relative overflow-hidden rounded-3xl border border-border aspect-[16/9] bg-surface">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle at 30% 30%, oklch(0.78 0.18 220 / 0.6), transparent 60%), radial-gradient(circle at 70% 70%, oklch(0.7 0.22 300 / 0.5), transparent 55%)" }}
          />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 grid place-items-center font-mono text-9xl font-bold text-foreground/10">
            {project.title[0]}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-12 prose prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>

          {project.case_study && (
            <div className="mt-10 space-y-4 text-foreground">
              {project.case_study.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith("## ")) return <h2 key={i} className="text-2xl font-semibold mt-10 mb-3">{trimmed.slice(3)}</h2>;
                if (trimmed.startsWith("# ")) return <h1 key={i} className="text-3xl font-semibold mt-10 mb-3">{trimmed.slice(2)}</h1>;
                if (trimmed.startsWith("- ")) return <li key={i} className="ml-6 text-muted-foreground">{trimmed.slice(2)}</li>;
                return <p key={i} className="text-muted-foreground leading-relaxed">{trimmed}</p>;
              })}
            </div>
          )}
        </div>
      </Reveal>
    </article>
  );
}
