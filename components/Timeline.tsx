"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, FlaskConical, GraduationCap, Medal, type LucideIcon } from "lucide-react";
import { SplitText } from "./SplitText";
import { timeline, type TimelineItem } from "@/lib/data";
import { ease, viewportOnce } from "@/lib/variants";

const kindMeta: Record<TimelineItem["kind"], { icon: LucideIcon; label: string }> = {
  venture: { icon: Briefcase, label: "Venture" },
  research: { icon: FlaskConical, label: "Research" },
  education: { icon: GraduationCap, label: "Education" },
  fellowship: { icon: Medal, label: "Programme" },
};

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <section id="journey" className="section">
      <p className="eyebrow mb-4">Journey</p>
      <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
        <SplitText text="Research, ventures and the long road through medicine." trigger="view" accentWords={["medicine."]} />
      </h2>

      <div ref={ref} className="relative mt-16 pl-8 sm:pl-12">
        {/* track + progress fill */}
        <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 sm:left-[15px]" />
        <motion.div
          aria-hidden
          className="absolute left-[11px] top-0 w-px origin-top bg-gradient-to-b from-accent via-accent2 to-accent/30 shadow-[0_0_12px_rgb(var(--accent)/0.8)] sm:left-[15px]"
          style={{ scaleY: fill, height: "100%" }}
        />

        <ol className="space-y-12">
          {timeline.map((item) => {
            const { icon: Icon, label } = kindMeta[item.kind];
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, ease }}
                className="relative"
              >
                <span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-obsidian sm:-left-12 sm:h-8 sm:w-8">
                  <Icon className="h-3 w-3 text-accent sm:h-3.5 sm:w-3.5" />
                </span>
                <div className="glass rounded-2xl p-5 transition-colors duration-300 hover:bg-white/[0.05] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <p className="font-mono text-xs text-accent">{item.period}</p>
                    <span className="eyebrow">{label}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.org}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">{item.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
