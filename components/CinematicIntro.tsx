"use client";

import { motion } from "framer-motion";

export default function CinematicIntro() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-[#e5a04b]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }}
        transition={{ duration: 2.2, times: [0, 0.25, 0.78, 1], ease: "easeOut" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#e5a04b] shadow-[0_0_14px_rgba(229,160,75,0.8)]" />
        Entering observation field
      </motion.div>
    </motion.div>
  );
}
