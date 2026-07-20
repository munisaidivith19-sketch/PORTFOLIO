import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data/portfolio";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative border-t border-glass-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono-ui text-xs text-white/40">
          © {new Date().getFullYear()} {profile.name} · Built with React & Three.js
        </p>
        <div className="flex items-center gap-5">
          <a href={`mailto:${profile.email}`} data-cursor-hover aria-label="Email" className="text-white/50 hover:text-accent">
            <Mail size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor-hover aria-label="LinkedIn" className="text-white/50 hover:text-accent">
            <FaLinkedin size={18} />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" data-cursor-hover aria-label="GitHub" className="text-white/50 hover:text-accent">
            <FaGithub size={18} />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor-hover
            aria-label="Back to top"
            className="glass fixed bottom-6 right-6 z-[70] rounded-full p-3 text-white shadow-glow"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
