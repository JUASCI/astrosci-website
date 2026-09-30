"use client";
import { motion } from "framer-motion";

const galleryItems = [
  { title: "Orion Nebula", photographer: "Priya Sen", gradient: "radial-gradient(ellipse at 40% 50%, #1e40af 0%, #0c1e3d 40%, #050505 100%)", glow: "#3b82f6", tag: "Nebula" },
  { title: "Andromeda Galaxy", photographer: "Arjun Bose", gradient: "radial-gradient(ellipse at 60% 40%, #065f46 0%, #022c22 50%, #050505 100%)", glow: "#c87938", tag: "Galaxy" },
  { title: "Saturn Transit", photographer: "Sneha Das", gradient: "radial-gradient(ellipse at 50% 60%, #78350f 0%, #3b1a09 50%, #050505 100%)", glow: "#e5a04b", tag: "Planets" },
  { title: "Milky Way Core", photographer: "Ravi Chatterjee", gradient: "radial-gradient(ellipse at 50% 40%, #2a1e16 0%, #2d1b69 30%, #050505 80%)", glow: "#b7682c", tag: "Milky Way" },
  { title: "Lunar Eclipse", photographer: "Mita Roy", gradient: "radial-gradient(ellipse at 45% 45%, #7f1d1d 0%, #450a0a 50%, #050505 100%)", glow: "#ef4444", tag: "Moon" },
  { title: "Pleiades Cluster", photographer: "Dibya Ghosh", gradient: "radial-gradient(ellipse at 55% 40%, #164e63 0%, #0c4a6e 40%, #050505 100%)", glow: "#e5a04b", tag: "Star Cluster" },
];

export default function GalleryPreview() {
  return (
    <section id="gallery" className="py-24 px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e5a04b]/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs tracking-[0.4em] text-[#e5a04b] mb-2 uppercase" style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>
              — Astrophotography —
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}>GALLERY PREVIEW</h2>
            <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>Shot by our members, from our campus</p>
          </div>
          <motion.a
            href="#gallery"
            className="text-sm text-[#e5a04b] border-b border-[#e5a04b]/40 hover:border-[#e5a04b] transition-colors pb-1 whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
            whileHover={{ x: 4 }}
          >
            Open Full Gallery →
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-400"
              style={{ aspectRatio: i === 0 || i === 3 ? "1/1" : "4/3" }}
            >
              <div className="w-full h-full relative" style={{ background: item.gradient }}>
                {[...Array(25)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${Math.random() * 2 + 0.5}px`,
                      height: `${Math.random() * 2 + 0.5}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.7 + 0.3,
                    }}
                  />
                ))}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-3xl opacity-50"
                  style={{ background: item.glow }}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white font-bold text-sm" style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}>{item.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>by {item.photographer}</p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif", color: item.glow, borderColor: `${item.glow}40`, background: `${item.glow}15` }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Static tag */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity">
                <span
                  className="text-xs px-2 py-0.5 rounded-full border bg-black/40 backdrop-blur-sm"
                  style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif", color: item.glow, borderColor: `${item.glow}30` }}
                >
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <motion.button
            className="px-6 py-3 sm:px-10 sm:py-4 rounded-full border border-[#e5a04b]/30 text-[#e5a04b] text-xs sm:text-sm font-medium hover:bg-[#e5a04b]/10 hover:border-[#e5a04b]/60 hover:shadow-[0_0_30px_rgba(229,160,75,0.2)] transition-all duration-300"
            style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View All 200+ Photos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
