"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Smooth custom cursor: a precise dot plus a springy ring that grows over interactive elements. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: Event) => {
      const t = e.target as Element | null;
      setHovering(!!t?.closest("a, button, input, textarea, [data-cursor='hover']"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-5 -mt-5 h-10 w-10"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="h-full w-full rounded-full border border-white/40"
          animate={{
            scale: pressed ? 0.7 : hovering ? 1.7 : 1,
            backgroundColor: hovering ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
            borderColor: hovering ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </motion.div>
    </>
  );
}
