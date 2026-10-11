"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { SplitText } from "./SplitText";
import { about, site } from "@/lib/data";
import { ease, fadeUp, staggerContainer } from "@/lib/variants";

const quick = [
  { label: "GitHub", href: site.github, icon: Github, external: true },
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail, external: false },
];

/** Cursor-reactive gradient sphere with orbiting rings. */
function Sphere() {
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 70, damping: 18, mass: 1 });
  const sy = useSpring(ny, { stiffness: 70, damping: 18, mass: 1 });
  const x = useTransform(sx, (v) => v * 38);
  const y = useTransform(sy, (v) => v * 38);
  const rotateY = useTransform(sx, (v) => v * 14);
  const rotateX = useTransform(sy, (v) => v * -14);
  const hx = useTransform(sx, (v) => `${50 + v * 14}%`);
  const hy = useTransform(sy, (v) => `${42 + v * 14}%`);
  const highlight = useTransform(
    [hx, hy],
    ([a, b]) =>
      `radial-gradient(circle at ${a} ${b}, rgb(255 255 255 / 0.55), rgb(var(--accent) / 0.85) 28%, rgb(var(--accent-2) / 0.35) 58%, transparent 72%)`,
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      nx.set((e.clientX / window.innerWidth) * 2 - 1);
      ny.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [nx, ny]);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease, delay: 0.3 }}
      className="pointer-events-none absolute right-[-18%] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 sm:right-[-6%] sm:h-[32rem] sm:w-[32rem] lg:right-[2%] lg:h-[36rem] lg:w-[36rem]"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-[10%] animate-spin-slow rounded-full border border-white/10">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_24px_4px_rgb(var(--accent)/0.7)]" />
        </div>
        <div className="absolute inset-[-2%] animate-spin-slower rounded-full border border-dashed border-white/[0.07]">
          <span className="absolute bottom-[12%] right-[6%] h-2 w-2 rounded-full bg-accent2 shadow-[0_0_20px_4px_rgb(var(--accent-2)/0.6)]" />
        </div>
        <motion.div
          className="absolute inset-[18%] rounded-full opacity-90 blur-[1px]"
          style={{ background: highlight, boxShadow: "0 0 120px 10px rgb(var(--accent) / 0.25)" }}
        />
        <div className="absolute inset-[18%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.55),transparent_60%)]" />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Sphere />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-32 sm:px-8">
        <motion.div variants={staggerContainer(0.1, 0.15)} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
              {site.role}
            </span>
          </motion.div>

          <h1 className="max-w-4xl text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            <SplitText text={about.headline} accentWords={["builder", "instinct."]} delay={0.25} />
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            {about.blurb}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)]"
            >
              Explore Work
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.07]"
            >
              Get in Touch
            </MagneticButton>
            <div className="ml-1 flex items-center gap-1.5">
              {quick.map(({ label, href, icon: Icon, external }) => (
                <MagneticButton
                  key={label}
                  href={href}
                  external={external}
                  ariaLabel={label}
                  strength={0.45}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div aria-hidden className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="eyebrow">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-0 animate-scrollcue bg-gradient-to-b from-transparent via-white/80 to-transparent" />
        </span>
      </div>
    </section>
  );
}
