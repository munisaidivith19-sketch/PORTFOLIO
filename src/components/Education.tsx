import { GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { education } from "../data/portfolio";

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading
        eyebrow="// 05 · EDUCATION"
        title="Academic path"
        description="No formal work history yet — here's the coursework building toward it."
      />

      <div className="relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-transparent sm:left-1/2" />
        <div className="space-y-10">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.1}>
              <div
                className={`relative flex flex-col gap-3 sm:flex-row sm:items-center ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-bg ring-2 ring-primary/60 sm:left-1/2 sm:-translate-x-1/2">
                  <GraduationCap size={15} className="text-primary" />
                </span>

                <div className={`glass w-full rounded-xl p-5 pl-12 sm:w-[calc(50%-2rem)] sm:pl-5 ${i % 2 === 0 ? "sm:mr-auto sm:text-right" : "sm:ml-auto"}`}>
                  <span className="font-mono-ui text-xs text-secondary">{e.period}</span>
                  <h3 className="mt-1 font-display font-semibold text-white">{e.title}</h3>
                  <p className="text-sm text-white/55">{e.place}</p>
                  <p className="mt-1 font-mono-ui text-xs text-accent">{e.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
