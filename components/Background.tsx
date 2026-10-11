import { ParticleField } from "./ParticleField";

/** Fixed, non-interactive backdrop: mesh gradient + particle grid + vignette + grain. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-obsidian">
      {/* dynamic mesh gradient */}
      <div className="absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] animate-float rounded-full bg-accent/[0.16] blur-[120px] will-change-transform" />
      <div className="absolute -right-[15%] top-[25%] h-[55vmax] w-[55vmax] animate-float-slow rounded-full bg-accent2/[0.12] blur-[130px] will-change-transform" />
      <div className="absolute bottom-[-25%] left-[20%] h-[50vmax] w-[50vmax] animate-float rounded-full bg-accent/[0.09] blur-[140px] will-change-transform [animation-delay:-9s]" />

      <ParticleField />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(9,9,11,0.85)_100%)]" />
      {/* grain */}
      <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
