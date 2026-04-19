import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/lib/types";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Work — Darji Dev" },
      { name: "description", content: "Selected projects by Darji Dev — full-stack web apps, tools, and experiments." },
      { property: "og:title", content: "Work — Darji Dev" },
      { property: "og:description", content: "A collection of full-stack projects." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    supabase.from("projects").select("*").order("display_order", { ascending: false })
      .then(({ data }) => {
        setProjects((data as Project[]) ?? []);
        setLoading(false);
      });
  }, []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tech_stack.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.tech_stack.includes(filter));

  return (
    <section className="container mx-auto px-4 pt-32 pb-24">
      <SectionHeading
        eyebrow="Work"
        title="Things I've built."
        sub="From quick experiments to fully-shipped products. Each one taught me something."
      />

      <Reveal>
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all ${
                filter === t
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Reveal>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[16/13] rounded-2xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12 font-mono text-sm">No projects with this tag yet.</p>
      )}
    </section>
  );
}
