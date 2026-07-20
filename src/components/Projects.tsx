import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ExternalLink, X, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/portfolio";

export default function Projects() {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="// 03 · PROJECTS"
        title="Hands-on security work"
        description="Selected coursework and independent labs — click a card to open the full case study."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <motion.button
              onClick={() => setActive(p)}
              data-cursor-hover
              whileHover={{ scale: 1.02 }}
              className="glass group flex h-full w-full flex-col items-start rounded-2xl p-7 text-left transition-shadow hover:shadow-glow-cyan"
            >
              <div className="flex w-full items-center justify-between">
                <div className="rounded-xl bg-primary/15 p-3 text-accent">
                  <Terminal size={22} />
                </div>
                <span className="font-mono-ui text-[11px] text-white/40">CASE STUDY</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-white/55">{p.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-glass-border px-2.5 py-1 font-mono-ui text-[10px] text-white/60">
                    {t}
                  </span>
                ))}
                {p.stack.length > 3 && (
                  <span className="rounded-full border border-glass-border px-2.5 py-1 font-mono-ui text-[10px] text-white/40">
                    +{p.stack.length - 3}
                  </span>
                )}
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-2xl font-semibold text-white">{active.title}</h3>
                <button onClick={() => setActive(null)} aria-label="Close" className="text-white/50 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-mono-ui text-xs uppercase tracking-wide text-secondary">Problem</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{active.problem}</p>
                </div>
                <div>
                  <h4 className="font-mono-ui text-xs uppercase tracking-wide text-secondary">Solution</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{active.solution}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-mono-ui text-xs uppercase tracking-wide text-secondary">Key Features</h4>
                <ul className="mt-2 space-y-2">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-mono-ui text-xs uppercase tracking-wide text-secondary">Tech Stack</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {active.stack.map((t) => (
                    <span key={t} className="rounded-full border border-glass-border bg-white/5 px-3 py-1 font-mono-ui text-[11px] text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <a
                  href={active.github || "#"}
                  className="flex items-center gap-2 rounded-full border border-glass-border bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:text-white"
                >
                  <FaGithub size={16} /> GitHub
                </a>
                <a
                  href={active.demo || "#"}
                  className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-white shadow-glow"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
