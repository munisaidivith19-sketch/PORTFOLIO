# Krishnapatnam Muni Sai Divith — Portfolio

A dark, glassmorphic, animated portfolio built with React 19, TypeScript, Tailwind CSS, Three.js (via React Three Fiber), and Framer Motion. Content is pulled from your resume; sections cover About, Skills, Projects, Certifications, Education, live GitHub stats, and a working contact form.

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS** — all styling, no CSS modules/inline styles
- **Framer Motion** — section reveals, hero stagger, modal transitions, magnetic-ish hovers
- **Three.js + React Three Fiber + Drei** — animated, mouse-reactive network-node background (lazy-loaded so it doesn't block first paint)
- **Lenis** — smooth scroll
- **Lucide React** + **React Icons** (for GitHub/LinkedIn brand marks, which Lucide no longer ships)
- **React Router DOM** — installed and ready if you split into multiple routes later; the site currently ships as a single scrolling page, which is the stronger pattern for a portfolio
- **EmailJS** — contact form
- **React CountUp**, **React Type Animation**, **React Intersection Observer**

A few libraries from the original spec were intentionally left out to keep the bundle lean and avoid conflicting styling systems: Shadcn UI and React Tilt. The tilt effect on skill cards and the glass/shadcn look are hand-rolled with Tailwind + Framer Motion instead, so there's one consistent design system rather than two.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. Production build:

```bash
npm run build
npm run preview
```

## Customize your content

Almost everything lives in one file: **`src/data/portfolio.ts`** — name, roles, summary, stats, education, certifications, skills, and projects. Edit that file first for any content change.

### GitHub stats section
Set `githubUsername` in `src/data/portfolio.ts` to your GitHub handle to pull in live public repo/star/follower counts. Leave it blank and the section shows a setup hint instead of fake data.

### Contact form (EmailJS)
1. Create a free account at emailjs.com, add an email service and a template.
2. Copy `.env.example` to `.env` and fill in:
   ```
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```
3. The form validates client-side and shows toast feedback either way. Without keys set, submitting shows a "needs configuration" toast instead of silently failing.

### Resume download
Replace `public/resume.pdf` with an updated export whenever your resume changes — the filename stays the same so the "Download Resume" buttons keep working.

### Social links
Update `email`, `linkedin`, and `github` in `src/data/portfolio.ts`.

## Deploying to Vercel

**Option A — CLI**
```bash
npm install -g vercel
vercel login
vercel        # first deploy, follow prompts (framework preset: Vite)
vercel --prod # promote to production
```

**Option B — Git integration (recommended)**
1. Push this project to a GitHub repo.
2. Go to vercel.com/new and import the repo.
3. Vercel auto-detects Vite — build command `npm run build`, output directory `dist`. Leave defaults.
4. If you set up EmailJS, add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` under Project Settings → Environment Variables, for both Production and Preview.
5. Deploy. Every push to your main branch redeploys automatically.

## Notes on scope

- **Design**: dark glassmorphism, exact palette from the brief (`#050816` background, `#2563EB` primary, `#06B6D4` secondary, `#00F5FF` accent), Space Grotesk/Inter/JetBrains Mono type system, and an interactive Three.js network topology as the signature visual — it fits a network-engineering portfolio more specifically than a generic particle field or rotating globe.
- **Light mode** was on the extras list but conflicts with the brief's own pinned-down dark palette, so the site ships dark-only by design rather than with a half-hearted second theme. Happy to add a real light theme as a follow-up if you want one.
- **Projects section** currently has one entry (your Metasploitable2 pentest) because that's what's on the resume — the component supports any number of projects, so add more to the `projects` array in `portfolio.ts` as you build them.
- Respects `prefers-reduced-motion` (disables Lenis smoothing and shortens animations) and has visible focus states for keyboard navigation.
