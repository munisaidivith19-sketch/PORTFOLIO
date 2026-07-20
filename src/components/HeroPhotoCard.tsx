import { useState } from "react";
import { profile } from "../data/portfolio";

/** Medium glass-framed photo shown on the right side of the Hero section.
 *  Falls back to initials if no photo has been added yet at public/profile-photo.jpg */
export default function HeroPhotoCard() {
  const [broken, setBroken] = useState(false);
  const initials = profile.shortName.slice(0, 2).toUpperCase();

  return (
    <div className="glass relative flex h-56 w-56 flex-col items-center justify-center overflow-hidden rounded-[2rem] shadow-glow-cyan animate-float sm:h-64 sm:w-64">
      {!broken ? (
        <img
          src={profile.photo}
          alt={profile.name}
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/40 to-secondary/40">
          <span className="font-display text-4xl font-semibold text-white">{initials}</span>
          <span className="font-mono-ui text-[10px] tracking-widest text-white/50">PHOTO NOT SET</span>
        </div>
      )}

      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md">
        <span className="font-mono-ui text-[11px] text-white/80">{profile.shortName}</span>
        <span className="flex items-center gap-1.5 font-mono-ui text-[10px] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
          Online
        </span>
      </div>
    </div>
  );
}