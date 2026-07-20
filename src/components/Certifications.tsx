import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, X, Download, ImageOff, Maximize2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { certifications } from "../data/portfolio";

type Cert = (typeof certifications)[number];

export default function Certifications() {
  const [active, setActive] = useState<Cert | null>(null);

  return (
    <section id="certifications" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading
        eyebrow="// 04 · CERTIFICATIONS"
        title="Verified learning"
        description="Click any certification to view the certificate."
      />

      <div className="relative space-y-6 border-l border-glass-border pl-8">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <div className="relative">
              <span className="absolute -left-[38px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-bg ring-2 ring-accent/50">
                <Award size={13} className="text-accent" />
              </span>
              <button
                onClick={() => setActive(c)}
                data-cursor-hover
                className="glass group flex w-full flex-wrap items-center justify-between gap-3 rounded-xl p-5 text-left transition-all hover:border-accent/40 hover:shadow-glow-cyan"
              >
                <div>
                  <h3 className="font-display font-semibold text-white">{c.title}</h3>
                  <p className="text-sm text-white/50">{c.issuer}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-glass-border px-3 py-1 font-mono-ui text-xs text-secondary">
                    {c.year}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono-ui text-[11px] text-white/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 size={12} /> View
                  </span>
                </div>
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <CertificateModal cert={active} onClose={() => setActive(null)} />
    </section>
  );
}

function CertificateModal({ cert, onClose }: { cert: Cert | null; onClose: () => void }) {
  const [broken, setBroken] = useState(false);

  return (
    <AnimatePresence onExitComplete={() => setBroken(false)}>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-white">{cert.title}</h3>
                <p className="mt-1 text-sm text-white/50">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
              <button onClick={onClose} aria-label="Close" className="shrink-0 text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-glass-border bg-black/30">
              {!broken ? (
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="mx-auto max-h-[65vh] w-auto"
                  onError={() => setBroken(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 px-8 py-20 text-center">
                  <ImageOff className="text-white/30" size={32} />
                  <p className="text-sm text-white/50">
                    No certificate image found yet. Add a screenshot at{" "}
                    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono-ui text-accent">
                      public{cert.image}
                    </code>
                  </p>
                </div>
              )}
            </div>

            {!broken && (
              <div className="mt-5 flex justify-end">
                <a href={cert.image} download data-cursor-hover className="flex items-center gap-2 rounded-full border border-glass-border bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:text-white">
                  <Download size={16} /> Download
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}