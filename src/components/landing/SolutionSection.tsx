"use client";

import { motion } from "framer-motion";
import { Activity, Map, ShieldCheck, BookOpen } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Survei Diagnostik",
    description:
      "Evaluasi penggunaan gadget di lingkungan sekolah untuk memetakan tingkat kesiapan digital.",
    accent: "#f97316",
    accentLight: "rgba(249,115,22,0.12)",
    accentBorder: "rgba(249,115,22,0.25)",
    number: "01",
  },
  {
    icon: Map,
    title: "Peta Partisipasi",
    description:
      "Visualisasi sebaran sekolah yang telah berkontribusi dalam gerakan sadar digital nasional.",
    accent: "#10b981",
    accentLight: "rgba(16,185,129,0.12)",
    accentBorder: "rgba(16,185,129,0.25)",
    number: "02",
  },
  {
    icon: ShieldCheck,
    title: "Komitmen Digital",
    description:
      "Penandatanganan kontrak digital resmi sebagai bukti tanggung jawab bersama ekosistem sekolah.",
    accent: "#8b5cf6",
    accentLight: "rgba(139,92,246,0.12)",
    accentBorder: "rgba(139,92,246,0.25)",
    number: "03",
  },
  {
    icon: BookOpen,
    title: "Studi Kasus",
    description:
      "Kumpulan praktik terbaik dari sekolah yang berhasil mengelola ekosistem digital secara efektif.",
    accent: "#f43f5e",
    accentLight: "rgba(244,63,94,0.12)",
    accentBorder: "rgba(244,63,94,0.25)",
    number: "04",
  },
];

export function SolutionSection() {
  return (
    <section className="relative py-28 px-4 overflow-hidden bg-[#050505]">
      {/* ── Dynamic Glowing Mesh ── */}
      <div className="absolute inset-0 bg-white/[0.01] mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-[0.15em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Solusi Utama
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight tracking-tight">
            Langkah Nyata{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kolaboratif
            </span>
            <br />
            Berbasis Partisipasi
          </h2>

          <p className="text-white/50 max-w-2xl mx-auto text-lg font-medium">
            Empat layanan utama yang menjadi fondasi platform ini dalam
            mendampingi sekolah membangun ekosistem digital yang sehat.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative rounded-2xl overflow-hidden border backdrop-blur-sm flex flex-col p-6 group transition-all duration-300"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${feature.accent}18 0%, transparent 65%)`,
                }}
              />

              {/* Number */}
              <span
                className="relative z-10 text-xs font-black tracking-widest mb-6 opacity-40"
                style={{ color: feature.accent }}
              >
                {feature.number}
              </span>

              {/* Icon */}
              <div
                className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 border group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundColor: feature.accentLight,
                  borderColor: feature.accentBorder,
                }}
              >
                <feature.icon
                  className="w-5 h-5"
                  style={{ color: feature.accent }}
                />
              </div>

              {/* Text */}
              <h3 className="relative z-10 font-bold text-white mb-3 text-base leading-snug">
                {feature.title}
              </h3>
              <p className="relative z-10 text-white/40 text-sm leading-relaxed flex-1">
                {feature.description}
              </p>

              {/* Bottom accent bar */}
              <div
                className="relative z-10 mt-6 h-[2px] w-8 rounded-full opacity-40 group-hover:opacity-100 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: feature.accent }}
              />

              {/* Corner decoration */}
              <svg
                className="absolute bottom-3 right-3 opacity-10"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M32 0 L32 32 L0 32"
                  stroke={feature.accent}
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
