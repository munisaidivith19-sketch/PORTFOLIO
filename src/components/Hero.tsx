import { motion, type Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, ShieldCheck, Send } from "lucide-react";
import { profile } from "../data/portfolio";
import HeroPhotoCard from "./HeroPhotoCard";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-[100px] animate-pulse-glow" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-1.5 font-mono-ui text-xs text-secondary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            OPEN TO NETWORK ENGINEERING INTERNSHIPS
          </motion.div>

          <motion.h1 variants={item} className="font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {profile.name}
          </motion.h1>

          <motion.div variants={item} className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono-ui text-sm text-white/60 sm:text-base">
            {profile.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                {i > 0 && <span className="text-accent">/</span>}
                {role}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-6 h-8 font-mono-ui text-lg text-accent sm:text-xl">
            <span className="text-white/40">$ focus --on=</span>
            <TypeAnimation sequence={profile.typingWords.flatMap((w) => [w, 1600])} wrapper="span" speed={50} repeat={Infinity} cursor />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-balance text-white/60">
            {profile.summary}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a href={profile.resumeFile} download data-cursor-hover className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-105">
              <Download size={16} /> Download Resume
            </a>
            <a href="#projects" data-cursor-hover className="flex items-center gap-2 rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105">
              <ShieldCheck size={16} /> View Projects
            </a>
            <a href="#contact" data-cursor-hover className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:text-accent">
              <Send size={16} /> Hire Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right: layered glass panel with photo, standing in for the 3D globe, composited over the canvas background */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} className="relative hidden aspect-square items-center justify-center lg:flex">
          <div className="absolute h-64 w-64 rounded-full border border-secondary/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute h-80 w-80 rounded-full border border-primary/15 animate-[spin_30s_linear_infinite_reverse]" />
          <HeroPhotoCard />
          {["AWS", "CCNA", "Cisco", "Python"].map((label, i) => (
            <div
              key={label}
              className={`glass absolute rounded-xl px-3 py-2 font-mono-ui text-xs text-white/80 ${i % 2 === 0 ? "animate-float" : "animate-float-delayed"}`}
              style={{ top: `${[8, 70, 15, 78][i]}%`, left: `${[10, 5, 78, 72][i]}%` }}
            >
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a href="#about" aria-label="Scroll to about section" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}