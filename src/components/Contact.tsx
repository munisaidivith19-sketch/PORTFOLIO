import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/portfolio";

// EmailJS credentials — create a free account at emailjs.com and fill these in,
// or wire this form up to your own backend. The form works offline in dev but
// won't actually send mail until these are set.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

type Status = "idle" | "sending" | "success" | "error" | "config";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email";
    if (message.length < 10) nextErrors.message = "Message should be at least 10 characters";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("config");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4500);
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading
        eyebrow="// 07 · CONTACT"
        title="Let's build something secure"
        description="Open to internships, collaborations, or just talking networks and security."
      />

      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <Reveal className="glass flex flex-col justify-between rounded-2xl p-7">
          <div>
            <h3 className="font-display font-semibold text-white">Direct contact</h3>
            <div className="mt-5 space-y-4">
              <a href={`mailto:${profile.email}`} data-cursor-hover className="flex items-center gap-3 text-sm text-white/70 hover:text-accent">
                <Mail size={16} /> {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor-hover className="flex items-center gap-3 text-sm text-white/70 hover:text-accent">
                <FaLinkedin size={16} /> LinkedIn Profile
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" data-cursor-hover className="flex items-center gap-3 text-sm text-white/70 hover:text-accent">
                <FaGithub size={16} /> GitHub Profile
              </a>
            </div>
          </div>
          <p className="mt-8 font-mono-ui text-[11px] text-white/35">Based in {profile.location} · Usually replies within a day</p>
        </Reveal>

        <Reveal delay={0.1} className="glass rounded-2xl p-7">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Field label="Name" name="name" error={errors.name} placeholder="Jane Doe" />
            <Field label="Email" name="email" type="email" error={errors.email} placeholder="jane@company.com" />
            <div>
              <label className="mb-1.5 block font-mono-ui text-xs text-white/50" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell me about the role or project…"
                className="w-full rounded-xl border border-glass-border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent"
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor-hover
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {status === "sending" ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>

      <AnimatePresence>
        {(status === "success" || status === "error" || status === "config") && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="glass fixed bottom-6 left-1/2 z-[90] flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white shadow-glow"
          >
            {status === "success" && <CheckCircle2 size={16} className="text-success" />}
            {(status === "error" || status === "config") && <AlertCircle size={16} className="text-red-400" />}
            {status === "success" && "Message sent — thanks for reaching out!"}
            {status === "error" && "Something went wrong. Try emailing directly instead."}
            {status === "config" && "Contact form needs EmailJS keys added to send mail."}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono-ui text-xs text-white/50" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-glass-border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
