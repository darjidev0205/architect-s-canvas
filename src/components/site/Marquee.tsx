import { motion } from "framer-motion";

const ROW = [
  "C", "C++", "JavaScript", "TypeScript", "React", "Next.js",
  "Node.js", "Python", "PostgreSQL", "MongoDB", "Supabase",
  "Tailwind", "UI / UX", "Testing", "Git",
];

export function Marquee() {
  const items = [...ROW, ...ROW];
  return (
    <div className="relative overflow-hidden py-6 border-y border-border bg-surface/30">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      <motion.div
        className="flex gap-12 whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {items.map((s, i) => (
          <span key={i} className="font-mono text-sm md:text-base text-muted-foreground hover:text-accent transition-colors">
            <span className="text-accent mr-3">✦</span>{s}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
