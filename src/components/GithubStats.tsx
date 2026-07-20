import { useEffect, useState, type ComponentType } from "react";
import { GitFork, Star, BookMarked, Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/portfolio";

type GhUser = {
  public_repos: number;
  followers: number;
  avatar_url: string;
  html_url: string;
};

type GhRepo = { stargazers_count: number; forks_count: number };

export default function GithubStats() {
  const [user, setUser] = useState<GhUser | null>(null);
  const [totals, setTotals] = useState({ stars: 0, forks: 0 });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    if (!profile.githubUsername) return;
    setStatus("loading");

    Promise.all([
      fetch(`https://api.github.com/users/${profile.githubUsername}`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${profile.githubUsername}/repos?per_page=100`).then((r) => r.json()),
    ])
      .then(([userData, repos]: [GhUser, GhRepo[]]) => {
        setUser(userData);
        if (Array.isArray(repos)) {
          setTotals({
            stars: repos.reduce((s, r) => s + (r.stargazers_count || 0), 0),
            forks: repos.reduce((s, r) => s + (r.forks_count || 0), 0),
          });
        }
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (!profile.githubUsername) {
    return (
      <section id="github" className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <SectionHeading eyebrow="// 06 · GITHUB" title="Live activity" />
        <Reveal className="glass mx-auto max-w-md rounded-2xl p-8">
          <FaGithub className="mx-auto text-white/40" size={28} />
          <p className="mt-4 text-sm text-white/55">
            Set <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono-ui text-accent">githubUsername</code>{" "}
            in <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono-ui text-accent">src/data/portfolio.ts</code>{" "}
            to pull in live repo stats, stars and contribution counts here.
          </p>
        </Reveal>
      </section>
    );
  }

  return (
    <section id="github" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading eyebrow="// 06 · GITHUB" title="Live activity" />
      <Reveal className="glass rounded-2xl p-8">
        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 py-10 text-white/50">
            <Loader2 className="animate-spin" size={18} /> Fetching GitHub data…
          </div>
        )}
        {status === "error" && (
          <p className="py-10 text-center text-sm text-white/50">Couldn't reach the GitHub API right now.</p>
        )}
        {status === "done" && user && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat icon={BookMarked} label="Repositories" value={user.public_repos} />
            <Stat icon={Star} label="Total Stars" value={totals.stars} />
            <Stat icon={GitFork} label="Total Forks" value={totals.forks} />
            <Stat icon={FaGithub} label="Followers" value={user.followers} />
          </div>
        )}
      </Reveal>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="text-center">
      <Icon className="mx-auto text-secondary" size={20} />
      <div className="mt-2 font-display text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 font-mono-ui text-[10px] uppercase tracking-wide text-white/45">{label}</div>
    </div>
  );
}
