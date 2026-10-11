"use client";

import type { PointerEvent } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Microchip, Stethoscope, type LucideIcon } from "lucide-react";
import { SplitText } from "./SplitText";
import { marquee, skillGroups } from "@/lib/data";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/variants";
import { cn } from "@/lib/utils";

const icons: Record<(typeof skillGroups)[number]["icon"], LucideIcon> = {
  cpu: Cpu,
  brain: Brain,
  stethoscope: Stethoscope,
  chip: Microchip,
};

function setSpotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Skills() {
  const loop = [...marquee, ...marquee];

  return (
    <section id="stack" className="section">
      <p className="eyebrow mb-4">Skills &amp; ecosystem</p>
      <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
        <SplitText text="One toolkit, from the bedside to the backend." trigger="view" accentWords={["backend."]} />
      </h2>

      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6"
      >
        {skillGroups.map((g) => {
          const Icon = icons[g.icon];
          return (
            <motion.article
              key={g.id}
              variants={scaleIn}
              onPointerMove={setSpotlight}
              data-cursor="hover"
              className={cn("spotlight glass rounded-3xl p-6 sm:p-7", g.span)}
            >
              <div className="relative z-10">
                <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white">{g.title}</h3>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-400">{g.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-300"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* continuous ticker */}
      <div
        aria-hidden
        className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {loop.map((m, i) => (
            <span
              key={`${m}-${i}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-zinc-400"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
