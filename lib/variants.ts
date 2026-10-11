import type { Transition, Variants } from "framer-motion";

/** Shared easing — a soft "expo-out" that feels dampened rather than linear. */
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Spring presets */
export const spring: Transition = { type: "spring", stiffness: 260, damping: 30, mass: 0.8 };
export const snappy: Transition = { type: "spring", stiffness: 420, damping: 32, mass: 0.6 };
export const soft: Transition = { type: "spring", stiffness: 140, damping: 24, mass: 1 };

/** Scroll-into-view settings: animate once, slightly before the element is fully visible. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/** Parent that staggers its children. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Generic reveal: rise + un-blur. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { ...spring } },
};

/** Staggered text reveal: each word slides up from behind a mask. */
export const wordReveal: Variants = {
  hidden: { y: "115%", rotate: 3 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.95, ease } },
};

/** Route / template transition (used in app/template.tsx). */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 14, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease } },
};

/** Case-study drawer */
export const drawerBackdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const drawerPanel: Variants = {
  hidden: { x: "100%", opacity: 0.6 },
  show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 34, mass: 0.9 } },
  exit: { x: "100%", opacity: 0.6, transition: { duration: 0.28, ease } },
};

/** Terminal panel */
export const terminalPanel: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { ...snappy } },
  exit: { opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.2, ease } },
};
