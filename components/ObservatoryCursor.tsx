"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ObservatoryCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(true);
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
      setVisible(true);
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
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerout", out, { passive: true });
    window.addEventListener("pointerleave", leave);
    window.addEventListener("pointerenter", enter);
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    if (finePointer.matches && !reducedMotion.matches) {
      document.documentElement.classList.add("observatory-cursor-enabled");
    }

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.classList.remove("observatory-cursor-enabled");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] h-8 w-8 rounded-full border border-[#e5a04b]/60"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: pressed ? 0.68 : hovering ? 1.7 : 1, opacity: visible ? (hovering ? 0.88 : 0.58) : 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5a04b] shadow-[0_0_8px_rgba(229,160,75,0.85)]" />
    </motion.div>
  );
}
