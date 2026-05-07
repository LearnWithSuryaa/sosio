"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  ClipboardList,
  MapPin,
  ArrowUpRight,
  Activity,
  Globe2,
  TrendingUp,
} from "lucide-react";

const MapPreviewInner = dynamic(
  () => import("@/components/landing/MapPreviewInner"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: "rgba(16,185,129,0.03)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
          <span className="text-xs text-white/20 font-mono tracking-widest uppercase">
            Memuat peta…
          </span>
        </div>
      </div>
    ),
  },
);

const stats = [
  { value: "300+", label: "Sekolah", icon: Globe2, color: "#10b981" },
  { value: "98%", label: "Aktif", icon: Activity, color: "#f59e0b" },
  { value: "12", label: "Provinsi", icon: TrendingUp, color: "#6366f1" },
];

const legend = [
  {
    icon: BadgeCheck,
    label: "Sudah Komitmen",
    accent: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    icon: ClipboardList,
    label: "Sudah Survei",
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    icon: MapPin,
    label: "Belum Ikut",
    accent: "#94a3b8",
    bg: "rgba(148,163,184,0.10)",
  },
];

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 * index }}
      className="relative flex-1 min-w-[100px] rounded-2xl p-4 overflow-hidden group"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl opacity-25 group-hover:opacity-45 transition-opacity duration-500"
        style={{ background: stat.color }}
      />
      <stat.icon
        className="w-4 h-4 mb-3 relative z-10"
        style={{ color: stat.color }}
      />
      <div className="text-2xl font-black text-white relative z-10 tracking-tight">
        {stat.value}
      </div>
      <div className="text-[10px] text-white/35 font-bold uppercase tracking-widest mt-0.5 relative z-10">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function MapPreview() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-[#050505]">
      {/* ── Dynamic Glowing Mesh ── */}
      <div className="absolute inset-0 bg-white/[0.01] mix-blend-overlay" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-5%] right-[10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[130px] rounded-full mix-blend-screen pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25"
                style={{ background: "rgba(16,185,129,0.08)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  Live · Real-time
                </span>
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight">
              Peta{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #34d399 0%, #10b981 40%, #059669 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Partisipasi
              </span>
              <br />
              <span className="text-white/30 text-4xl md:text-5xl">
                Sekolah Nasional
              </span>
            </h2>

            <p className="text-white/40 text-base mt-4 max-w-lg font-medium leading-relaxed">
              Pantau sebaran sekolah di seluruh Indonesia yang telah bergabung
              dalam ekosistem digital pendidikan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex gap-3"
          >
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Map card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            background: "#0a0e1a",
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 z-[60] pointer-events-none">
            <svg viewBox="0 0 64 64" fill="none">
              <path
                d="M2 32 L2 2 L32 2"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 z-[60] pointer-events-none">
            <svg viewBox="0 0 64 64" fill="none">
              <path
                d="M62 32 L62 2 L32 2"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
            </svg>
          </div>

          {/*
            FIX: Wrapper dengan tinggi eksplisit via style (bukan h-[460px] saja).
            Leaflet membutuhkan parent dengan computed height yang jelas.
            Kita inject CSS global untuk memastikan .leaflet-container full-size.
          */}
          <div className="relative w-full" style={{ height: "460px" }}>
            <style>{`
              .mp-leaflet-wrap,
              .mp-leaflet-wrap .leaflet-container {
                position: absolute !important;
                inset: 0 !important;
                width: 100% !important;
                height: 100% !important;
              }
            `}</style>

            <div className="mp-leaflet-wrap">
              <MapPreviewInner />
            </div>

            {/* Vignette overlays — z > Leaflet's z-[400] */}
            <div className="absolute inset-0 pointer-events-none z-[450]">
              <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#0a0e1a]/95 via-[#0a0e1a]/50 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#0a0e1a]/50 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#0a0e1a]/55 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#0a0e1a]/55 to-transparent" />
            </div>

            {/* Interaction blocker */}
            <div className="absolute inset-0 z-[460] cursor-default" />

            {/* Floating bottom bar */}
            <div className="absolute inset-x-0 bottom-0 z-[470] px-5 pb-5 flex items-end justify-between gap-3 flex-wrap">
              {/* Legend pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-2"
              >
                {legend.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: item.bg,
                      border: `1px solid ${item.accent}35`,
                      color: "rgba(255,255,255,0.7)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <item.icon
                      className="w-3 h-3 shrink-0"
                      style={{ color: item.accent }}
                    />
                    {item.label}
                  </div>
                ))}
              </motion.div>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.4 }}
                className="shrink-0"
              >
                <Link href="/peta">
                  <button
                    className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200"
                    style={{
                      background:
                        "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                      boxShadow:
                        "0 0 28px rgba(16,185,129,0.4), 0 4px 14px rgba(0,0,0,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.boxShadow =
                        "0 0 44px rgba(16,185,129,0.55), 0 4px 18px rgba(0,0,0,0.5)";
                      el.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.boxShadow =
                        "0 0 28px rgba(16,185,129,0.4), 0 4px 14px rgba(0,0,0,0.5)";
                      el.style.transform = "scale(1)";
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    Lihat Peta Lengkap
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom info strip */}
          <div
            className="grid grid-cols-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { label: "Data diperbarui", value: "Setiap hari" },
              { label: "Cakupan wilayah", value: "Seluruh Indonesia" },
              { label: "Status sistem", value: "Operasional" },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center py-4 px-3 gap-0.5"
                style={{
                  borderRight:
                    i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/20">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-white/55">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
