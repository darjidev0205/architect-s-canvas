import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Linkedin, Mail, Send, Twitter, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Darji Dev" },
      { name: "description", content: "Get in touch with Darji Dev for freelance, collaboration, or full-time opportunities." },
      { property: "og:title", content: "Contact — Darji Dev" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Message is too short").max(5000),
});

function ContactPage() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject") || undefined,
      message: fd.get("message"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setState("sending");
    const { error: dbErr } = await supabase.from("contact_messages").insert(parsed.data);
    if (dbErr) {
      setState("error");
      setError("Couldn't send right now. Try again or email me directly.");
      return;
    }
    setState("sent");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section className="container mx-auto px-4 pt-32 pb-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something."
        sub="I read every message. Whether it's a project, a question, or just a hello — drop a line below."
      />

      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="name" label="Your name" placeholder="Jane Doe" required />
              <Field name="email" label="Email" type="email" placeholder="jane@company.com" required />
            </div>
            <Field name="subject" label="Subject" placeholder="Project inquiry" />
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Message *</label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell me about your idea, timeline, and budget…"
                className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors resize-none"
              />
            </div>

            {error && <p className="text-sm text-destructive font-mono">{error}</p>}

            <button
              type="submit"
              disabled={state === "sending" || state === "sent"}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === "sending" && <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>}
              {state === "sent" && <><Check className="h-4 w-4" /> Message sent — talk soon!</>}
              {(state === "idle" || state === "error") && <>Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-2 space-y-4">
          <div className="glass rounded-3xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Direct email</p>
            <a href="mailto:hello@darji.dev" className="text-lg font-medium text-gradient">hello@darji.dev</a>
            <p className="mt-3 text-sm text-muted-foreground">Usually reply within 24 hours.</p>
          </div>

          <div className="glass rounded-3xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Find me elsewhere</p>
            <div className="space-y-2">
              {[
                { Icon: Github, label: "GitHub", href: "https://github.com" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                { Icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
                { Icon: Mail, label: "Email", href: "mailto:hello@darji.dev" },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-secondary transition-colors group">
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  <span className="text-sm font-medium">{label}</span>
                  <span className="ml-auto text-xs text-muted-foreground font-mono">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <p className="font-mono text-xs">Available now</p>
            </div>
            <p className="text-sm text-muted-foreground">Open to freelance projects and full-time roles.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
        {label} {required && "*"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
      />
    </div>
  );
}
