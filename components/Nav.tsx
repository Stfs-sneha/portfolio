"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SquareTerminal } from "lucide-react";
import { snappy } from "@/lib/variants";

const links = [
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-accent to-accent2"
        style={{ scaleX: progress }}
      />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...snappy, delay: 0.4 }}
        className="fixed inset-x-0 top-4 z-40 flex justify-center px-3"
      >
        <nav className="glass-strong flex items-center gap-1 rounded-full p-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]">
          <a
            href="#top"
            aria-label="Back to top"
            data-cursor="hover"
            className="mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] font-mono text-[11px] font-semibold tracking-tight text-white"
          >
            SR
          </a>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-cursor="hover"
              className="relative rounded-full px-3 py-1.5 text-[13px] text-zinc-400 transition-colors hover:text-white sm:px-4"
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={snappy}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
          <button
            type="button"
            aria-label="Toggle terminal"
            data-cursor="hover"
            onClick={() => window.dispatchEvent(new Event("toggle-terminal"))}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <SquareTerminal className="h-4 w-4" />
          </button>
        </nav>
      </motion.header>
    </>
  );
}
