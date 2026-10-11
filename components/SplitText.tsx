"use client";

import { motion } from "framer-motion";
import { staggerContainer, viewportOnce, wordReveal } from "@/lib/variants";

type Props = {
  text: string;
  className?: string;
  /** Words (case-insensitive, punctuation ignored) rendered with the accent gradient. */
  accentWords?: string[];
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "view";
};

/** Staggered, masked word-by-word reveal. Render inside a heading element. */
export function SplitText({
  text,
  className,
  accentWords = [],
  delay = 0,
  stagger = 0.07,
  trigger = "mount",
}: Props) {
  const words = text.split(" ");
  const accent = accentWords.map((w) => w.toLowerCase());

  const motionProps =
    trigger === "view"
      ? { initial: "hidden", whileInView: "show", viewport: viewportOnce }
      : { initial: "hidden", animate: "show" };

  return (
    <motion.span
      className={className}
      variants={staggerContainer(stagger, delay)}
      aria-label={text}
      {...motionProps}
    >
      {words.map((word, i) => {
        const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
        return (
          <span
            key={`${word}-${i}`}
            aria-hidden
            className="inline-block overflow-hidden pb-[0.14em] align-bottom"
            style={{ marginBottom: "-0.14em" }}
          >
            <motion.span
              variants={wordReveal}
              className={`inline-block will-change-transform ${accent.includes(clean) ? "gradient-text" : ""}`}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
