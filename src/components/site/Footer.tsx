import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-accent text-[11px] font-bold text-accent-foreground">D</span>
              <span className="text-sm font-semibold">Darji Dev</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Building scalable digital experiences from Ahmedabad, India.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Sitemap</p>
              <ul className="space-y-2">
                <li><Link to="/about" className="magnetic-link">About</Link></li>
                <li><Link to="/projects" className="magnetic-link">Work</Link></li>
                <li><Link to="/blog" className="magnetic-link">Journal</Link></li>
                <li><Link to="/contact" className="magnetic-link">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Elsewhere</p>
              <ul className="space-y-2">
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="magnetic-link">GitHub ↗</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="magnetic-link">LinkedIn ↗</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="magnetic-link">Twitter ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Get in touch</p>
            <a href="mailto:hello@darji.dev" className="text-lg font-medium text-gradient">hello@darji.dev</a>
            <div className="flex gap-2 mt-4 md:justify-end">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Mail, href: "mailto:hello@darji.dev" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary hover:border-accent transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
          <p>© {new Date().getFullYear()} Darji Dev — Crafted with intent.</p>
          <p>Made in Ahmedabad · v1.0</p>
        </div>
      </div>
    </footer>
  );
}
