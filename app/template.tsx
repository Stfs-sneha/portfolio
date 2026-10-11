"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/variants";

/**
 * Re-mounts on every navigation, so this gives route-level entry transitions
 * (App Router doesn't support exit animations without extra plumbing).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate">
      {children}
    </motion.div>
  );
}
