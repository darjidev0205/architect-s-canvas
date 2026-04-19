import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/lib/types";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Darji Dev" },
      { name: "description", content: "Notes on building, shipping, and learning in public." },
      { property: "og:title", content: "Journal — Darji Dev" },
    ],
  }),
  component: BlogList,
});

function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false })
      .then(({ data }) => { setPosts((data as BlogPost[]) ?? []); setLoading(false); });
  }, []);

  return (
    <section className="container mx-auto px-4 pt-32 pb-24 max-w-4xl">
      <SectionHeading eyebrow="Journal" title="Notes from the workbench." sub="Things I'm thinking about, learning, or building." />

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 rounded-2xl bg-surface animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <article className="glass rounded-2xl p-6 md:p-8 hover:border-accent/50 transition-all hover:shadow-glow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {p.tags.map((t) => (
                          <span key={t} className="font-mono text-[10px] uppercase tracking-wider text-accent">{t}</span>
                        ))}
                        <span className="font-mono text-[10px] text-muted-foreground">· {p.read_minutes} min read</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-gradient transition-all">
                        {p.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                      <p className="mt-3 font-mono text-xs text-muted-foreground">
                        {new Date(p.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:rotate-0 -rotate-45 transition-all flex-shrink-0" />
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
          {posts.length === 0 && <p className="text-center text-muted-foreground font-mono text-sm py-12">No posts yet — coming soon.</p>}
        </div>
      )}
    </section>
  );
}
