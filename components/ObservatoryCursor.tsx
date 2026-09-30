"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ObservatoryCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 32, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 520, damping: 32, mass: 0.35 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, input, textarea, select, [data-cursor]")));
    };
    const out = (event: PointerEvent) => {
      if (!(event.relatedTarget as HTMLElement | null)?.closest?.("a, button, input, textarea, select, [data-cursor]")) {
        setHovering(false);
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerout", out, { passive: true });
    if (finePointer.matches && !reducedMotion.matches) {
      document.documentElement.classList.add("observatory-cursor-enabled");
    }

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.documentElement.classList.remove("observatory-cursor-enabled");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] h-7 w-7 rounded-full border border-[#e5a04b]/70"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: hovering ? 1.55 : 1, opacity: hovering ? 0.85 : 0.58 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5a04b]" />
    </motion.div>
  );
}
