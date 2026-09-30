"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, MoveUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import BlackHole from "@/components/ui/black-hole";

export default function HeroSection() {
  return (
    <section id="home" className="relative isolate min-h-[100dvh] overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0 opacity-90" aria-hidden="true">
        <BlackHole />
      </div>
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_55%_48%,transparent_0%,rgba(5,5,5,0.12)_35%,rgba(5,5,5,0.84)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050505]/25 via-transparent to-[#050505]" aria-hidden="true" />
      <div
        className="absolute inset-0 z-[1] opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:96px_96px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1500px] flex-col justify-between px-5 pb-8 pt-28 sm:px-8 lg:px-12 lg:pb-10 lg:pt-32">
        <div className="flex items-center justify-between border-b border-white/15 pb-4 text-[10px] uppercase tracking-[0.3em] text-white/55 sm:text-xs">
          <span>Observation field / 01</span>
          <span className="hidden sm:block">22°34′N · 88°22′E</span>
          <span>Jadavpur / Kolkata</span>
        </div>

        <div className="grid items-end gap-12 py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)] lg:gap-20 lg:py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#e5a04b]"
            >
              <span className="h-px w-10 bg-[#e5a04b]" />
              <span>{siteConfig.university}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(4.5rem,15vw,12rem)] font-semibold leading-[0.78] tracking-[-0.085em] text-white"
            >
              ASTRO
              <span className="block pl-[0.17em] text-[#e5a04b]">SCI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-9 max-w-md text-sm leading-7 text-white/65 sm:text-base"
            >
              A community exploring the universe through observation, research, and curiosity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="/auth?tab=signup"
                className="group inline-flex items-center gap-3 border border-[#e5a04b] bg-[#e5a04b] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-[#e5a04b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5a04b] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Explore events
                <MoveUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="/auth?tab=signup"
                className="inline-flex items-center gap-3 border border-white/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Join the club
              </a>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="max-w-xs border-l border-[#e5a04b]/60 pl-5 text-sm leading-6 text-white/55 lg:mb-8"
          >
            <p className="mb-7 text-[10px] uppercase tracking-[0.3em] text-[#e5a04b]">The field note</p>
            <p>
              Look closer. Every dark field is an archive of light — a place to learn the sky, share the image, and find your way back to wonder.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-4 text-[10px] uppercase tracking-[0.22em]">
              <div>
                <span className="block text-white/35">Signal</span>
                <span className="text-white/80">Active</span>
              </div>
              <div>
                <span className="block text-white/35">Mode</span>
                <span className="text-white/80">Curious</span>
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="flex items-end justify-between border-t border-white/15 pt-4 text-[10px] uppercase tracking-[0.25em] text-white/40 sm:text-xs">
          <span>AstroSci club / since 2011</span>
          <a href="/recruitment" className="group flex items-center gap-2 text-white/60 transition-colors hover:text-[#e5a04b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5a04b]">
            Scroll to explore
            <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
