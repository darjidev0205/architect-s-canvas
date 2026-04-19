import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/lib/types";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Darji Dev` },
      { property: "og:title", content: `${params.slug} — Journal entry` },
    ],
  }),
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 pt-40 pb-24 text-center">
      <h1 className="text-3xl font-semibold">Post not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-accent magnetic-link">← Back to journal</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-4 pt-40 pb-24 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle()
      .then(({ data }) => { setPost(data as BlogPost | null); setLoading(false); });
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 pt-40 pb-24"><div className="h-96 rounded-2xl bg-surface animate-pulse" /></div>;
  if (!post) throw notFound();

  return (
    <article className="container mx-auto px-4 pt-32 pb-24 max-w-3xl">
      <Reveal>
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 magnetic-link">
          <ArrowLeft className="h-4 w-4" /> Back to journal
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs text-muted-foreground">
          <time>{new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
          <span>·</span>
          <span>{post.read_minutes} min read</span>
          {post.tags.map((t) => <span key={t} className="text-accent">· {t}</span>)}
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-[1.05]">{post.title}</h1>
        <p className="mt-4 text-xl text-muted-foreground">{post.excerpt}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 space-y-4">
          {post.content.split("\n").map((line, i) => {
            const t = line.trim();
            if (!t) return null;
            if (t.startsWith("## ")) return <h2 key={i} className="text-2xl font-semibold mt-10 mb-3">{t.slice(3)}</h2>;
            if (t.startsWith("# ")) return <h1 key={i} className="text-3xl font-semibold mt-10 mb-3">{t.slice(2)}</h1>;
            if (t.startsWith("- ")) return <li key={i} className="ml-6 text-muted-foreground">{t.slice(2)}</li>;
            return <p key={i} className="text-muted-foreground leading-relaxed">{t}</p>;
          })}
        </div>
      </Reveal>
    </article>
  );
}
