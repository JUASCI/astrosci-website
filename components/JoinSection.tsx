"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function JoinSection() {
  return (
    <section id="join" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]/80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b7682c]/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#b7682c]/8 rounded-full blur-[120px]" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] text-[#e5a04b] mb-4 uppercase" style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>
            — Join Us —
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}>
            Become part of the<br />
            <span className="bg-gradient-to-r from-[#b7682c] to-[#c87938] bg-clip-text text-transparent">AstroSci community</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>
            Join a passionate group of astronomers, astrophotographers, and space enthusiasts.
            Attend stargazing events, contribute to our magazine, and explore the universe with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link href="/auth?tab=signup">
            <motion.span
              className="inline-flex px-10 py-4 rounded-full bg-gradient-to-r from-[#b7682c] to-[#8f4e25] text-white font-semibold text-sm tracking-wider shadow-[0_0_30px_rgba(183,104,44,0.4)] hover:shadow-[0_0_50px_rgba(183,104,44,0.7)] transition-all duration-300 cursor-pointer"
              style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Join Now
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
