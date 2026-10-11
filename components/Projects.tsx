"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, ShieldCheck, X } from "lucide-react";
import { SplitText } from "./SplitText";
import { TechBadge } from "./TechBadge";
import { projects, type Project } from "@/lib/data";
import {
  drawerBackdrop, drawerPanel, fadeUp, scaleIn, staggerContainer, viewportOnce,
} from "@/lib/variants";

/** Card with perspective tilt, cursor-following glare and a coloured glow. */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.5 });
  const spy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.5 });
  const rotateX = useTransform(spy, [0, 1], [7, -7]);
  const rotateY = useTransform(spx, [0, 1], [-7, 7]);
  const glare = useTransform(
    [spx, spy],
    ([x, y]) =>
      `radial-gradient(420px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgb(${project.hue} / 0.22), transparent 62%)`,
  );

  const onMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div variants={scaleIn} className={project.span} style={{ perspective: 1100 }}>
      <motion.button
        ref={ref}
        type="button"
        data-cursor="hover"
        onClick={() => onOpen(project)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.985 }}
        className="group relative flex h-full min-h-[22rem] w-full flex-col justify-between overflow-hidden rounded-3xl glass p-6 text-left will-change-transform sm:p-8"
      >
        <motion.div aria-hidden className="absolute inset-0" style={{ background: glare }} />
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: `rgb(${project.hue} / 0.5)` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
        />

        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
          <span className="font-mono text-xs text-zinc-500">{project.index}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${project.hue})` }} />
            {project.status}
          </span>
        </div>

        <div className="relative mt-16" style={{ transform: "translateZ(60px)" }}>
          <p className="eyebrow mb-3">{project.category}</p>
          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.title}</h3>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-400">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.stack.slice(0, 4).map((s) => (
              <TechBadge key={s} name={s} />
            ))}
            <span className="ml-auto inline-flex items-center gap-1 text-xs text-zinc-500 transition-colors group-hover:text-white">
              Case study
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

/** Slide-in case-study drawer. */
function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.div
        variants={drawerBackdrop}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.aside
        variants={drawerPanel}
        initial="hidden"
        animate="show"
        exit="exit"
        className="glass-strong relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-white/10 p-6 sm:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: `rgb(${project.hue} / 0.5)` }}
        />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          data-cursor="hover"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <motion.div variants={staggerContainer(0.06, 0.12)} initial="hidden" animate="show" className="relative">
          <motion.p variants={fadeUp} className="eyebrow">
            {project.index} · {project.category}
          </motion.p>
          <motion.h3 variants={fadeUp} className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {project.title}
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-2 text-zinc-400">{project.summary}</motion.p>

          <motion.dl variants={fadeUp} className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <dt className="eyebrow">Status</dt>
              <dd className="mt-1 text-white">{project.status}</dd>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <dt className="eyebrow">Period</dt>
              <dd className="mt-1 text-white">{project.period}</dd>
            </div>
          </motion.dl>

          <motion.h4 variants={fadeUp} className="eyebrow mb-2 mt-9">The problem</motion.h4>
          <motion.p variants={fadeUp} className="leading-relaxed text-zinc-300">{project.problem}</motion.p>

          <motion.h4 variants={fadeUp} className="eyebrow mb-3 mt-9">Approach</motion.h4>
          <motion.ul variants={staggerContainer(0.07)} className="space-y-3">
            {project.approach.map((a) => (
              <motion.li key={a} variants={fadeUp} className="flex gap-3 text-[15px] leading-relaxed text-zinc-300">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {a}
              </motion.li>
            ))}
          </motion.ul>

          {project.guardrails && (
            <motion.div
              variants={fadeUp}
              className="mt-8 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-zinc-300"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
              {project.guardrails}
            </motion.div>
          )}

          <motion.h4 variants={fadeUp} className="eyebrow mb-3 mt-9">Stack</motion.h4>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <TechBadge key={s} name={s} />
            ))}
          </motion.div>

          {project.link && (
            <motion.a
              variants={fadeUp}
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950"
            >
              {project.link.label}
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          )}
        </motion.div>
      </motion.aside>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" className="section">
      <p className="eyebrow mb-4">Featured work</p>
      <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
        <SplitText text="Ventures and instruments, built against the clinic." trigger="view" accentWords={["clinic."]} />
      </h2>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setOpen} />
        ))}
      </motion.div>

      <AnimatePresence>{open && <CaseStudy key={open.id} project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
