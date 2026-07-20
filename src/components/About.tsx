import { useInView } from "react-intersection-observer";
import { Target, GraduationCap, Compass } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import useCountUp from "../hooks/useCountUp";
import { stats } from "../data/portfolio";

const cards = [
  { icon: Target, title: "Who I Am", body: "A cyber security student who got into computers through networks — I like knowing exactly how a packet gets from A to B, and where it can be intercepted along the way." },
  { icon: Compass, title: "Mission", body: "Turn CCNA theory into muscle memory: build, break, and secure real networks and cloud environments until the fundamentals are second nature." },
  { icon: GraduationCap, title: "Career Goal", body: "Land a Network Engineer or Network Architect internship, then grow into a role that blends infrastructure design with security — architecting networks that are built to resist attack." },
];

function StatCounter({ end, suffix, decimals, inView }: { end: number; suffix?: string; decimals?: number; inView: boolean }) {
  const value = useCountUp(end, inView, 2, decimals ?? 0);
  return <>{value}{suffix}</>;
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="// 01 · ABOUT" title="Building the fundamentals, one layer at a time" description="From the physical layer up — a snapshot of who I am and where I'm headed." />
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.1}>
            <div className="glass group h-full rounded-2xl p-7 transition-all hover:border-accent/40 hover:shadow-glow-cyan">
              <card.icon className="text-secondary transition-colors group-hover:text-accent" size={26} />
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{card.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2} className="mt-6">
        <div ref={ref} className="glass grid grid-cols-2 gap-6 rounded-2xl p-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-semibold text-gradient sm:text-4xl">
                <StatCounter end={s.value} suffix={s.suffix} decimals={s.decimals} inView={inView} />
              </div>
              <div className="mt-2 font-mono-ui text-[11px] uppercase tracking-wide text-white/45">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}