import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="mb-12 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{title}</h2>
        {sub && <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{sub}</p>}
      </div>
    </Reveal>
  );
}
