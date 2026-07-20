import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-white/55">{description}</p>}
    </Reveal>
  );
}
