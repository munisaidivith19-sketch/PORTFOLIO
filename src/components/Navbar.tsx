import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, profile } from "../data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          data-cursor-hover
          className="font-display text-lg font-semibold tracking-tight text-white"
        >
          Divith<span className="text-accent">.</span>
        </a>

        <nav className={`hidden items-center gap-1 rounded-full px-2 py-2 md:flex ${scrolled ? "glass" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor-hover
              className={`relative rounded-full px-4 py-2 font-mono-ui text-xs tracking-wide transition-colors ${
                active === link.href ? "text-bg" : "text-white/70 hover:text-white"
              }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </nav>

        <a
          href={profile.resumeFile}
          download
          data-cursor-hover
          className="hidden items-center gap-2 rounded-full bg-primary/90 px-4 py-2 font-mono-ui text-xs text-white shadow-glow transition-transform hover:scale-105 md:flex"
        >
          <Download size={14} /> Resume
        </a>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mx-4 mt-3 overflow-hidden rounded-2xl md:hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/5 py-3 font-mono-ui text-sm text-white/80 last:border-none"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={profile.resumeFile}
                download
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm text-white"
              >
                <Download size={14} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
