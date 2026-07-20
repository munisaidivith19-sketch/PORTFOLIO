import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Network, Router, Shield, Code2, Terminal,Cloud, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "../data/portfolio";

const iconMap: Record<string, LucideIcon> = { Network, Router, Shield, Code2, Terminal, Cloud };

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
      className="glass group h-full rounded-2xl p-6 transition-shadow hover:shadow-glow"
    >
      {children}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="// 02 · SKILLS"
        title="Toolkit across networking, cloud & code"
        description="Hover a card — every stack here has been used hands-on, not just read about."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = iconMap[group.icon];
          return (
            <Reveal key={group.title} delay={(i % 3) * 0.1}>
              <TiltCard>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/15 p-2.5 text-secondary group-hover:text-accent">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-white">{group.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-glass-border bg-white/[0.03] px-3 py-1.5 font-mono-ui text-[11px] text-white/70 transition-colors group-hover:border-accent/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
