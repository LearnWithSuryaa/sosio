"use client";

import { motion } from "framer-motion";
import { Activity, Map, ShieldCheck, BookOpen } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Survei Diagnostik",
    description:
      "Evaluasi penggunaan gadget di lingkungan sekolah untuk memetakan tingkat kesiapan digital.",
    accent: "#2E7D32",
    accentLight: "rgba(46, 125, 50,0.12)",
    accentBorder: "rgba(46, 125, 50,0.25)",
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
];

export function SolutionSection() {
  return (
    <section className="relative py-28 px-4 overflow-hidden bg-white">
      {/* ── Optimized Background Mesh ── */}
      {/* Menggunakan radial-gradient alih-alih blur() dan mix-blend-mode untuk performa maksimal tanpa lag */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 80% 20%, rgba(16,185,129,0.04) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(139,92,246,0.04) 0%, transparent 40%)
          `,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-soft bg-surface-alt text-primary text-xs font-bold uppercase tracking-[0.15em] mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Solusi Utama
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mt-2 mb-4 leading-tight tracking-tight">
            Langkah Nyata{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #64B5F6 0%, #2E7D32 100%)",
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

          <p className="text-text-dark max-w-2xl mx-auto text-lg font-medium">
            Tiga layanan utama yang menjadi fondasi platform ini dalam
            mendampingi sekolah membangun ekosistem digital yang sehat.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
              className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col p-6 group transition-all duration-300 hover:shadow-md hover:-translate-y-1.5 transform-gpu will-change-transform"
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
              <h3 className="relative z-10 font-bold text-text-dark mb-3 text-base leading-snug">
                {feature.title}
              </h3>
              <p className="relative z-10 text-text-dark text-sm leading-relaxed flex-1">
                {feature.description}
              </p>

              {/* Bottom accent bar */}
              <div
                className="relative z-10 mt-6 h-0.5 w-8 rounded-full opacity-40 group-hover:opacity-100 group-hover:w-full transition-all duration-500"
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
