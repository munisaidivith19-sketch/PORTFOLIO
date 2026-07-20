import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18 + 6);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 350);
        }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono-ui text-xs tracking-[0.3em] text-secondary">INITIALIZING SYSTEM</div>
          <div className="mt-6 font-display text-3xl font-semibold text-white">
            Divith<span className="text-accent">.</span>
          </div>
          <div className="mt-8 h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="mt-3 font-mono-ui text-[11px] text-white/40">{Math.floor(progress)}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
