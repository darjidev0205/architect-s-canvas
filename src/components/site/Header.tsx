import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Work" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="container mx-auto px-4">
        <div className={`mx-auto flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${scrolled ? "glass-strong shadow-card max-w-3xl" : "max-w-5xl"}`}>
          <Link to="/" className="flex items-center gap-2 pl-2">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-accent text-[11px] font-bold text-accent-foreground shadow-glow">
              D
            </span>
            <span className="hidden sm:inline text-sm font-semibold tracking-tight">darji.dev</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = item.to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="md:hidden grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 glass-strong rounded-2xl p-2"
            >
              {NAV.map((item) => (
                <Link key={item.to} to={item.to} className="block px-4 py-3 text-sm font-medium rounded-xl hover:bg-secondary">
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
