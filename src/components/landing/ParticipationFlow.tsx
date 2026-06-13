"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ClipboardList,
  MapPin,
  Handshake,
  QrCode,
  ArrowRight,
  Scan,
} from "lucide-react";

const steps = [
  {
    icon: MapPin,
    step: "01",
    title: "Sekolah Terdaftar",
    description:
      "Data sekolah seluruh Sidoarjo telah diverifikasi dan tersedia dalam sistem.",
    accent: "#1E88E5",
    position: "top",
  },
  {
    icon: QrCode,
    step: "02",
    title: "Dapatkan QR Code",
    description:
      "Admin akan menyediakan QR Code resmi secara unik untuk setiap sekolah.",
    accent: "#FFB74D",
    position: "left",
  },
  {
    icon: ClipboardList,
    step: "03",
    title: "Isi Kuis & Survei",
    description:
      "Siswa dan guru memindai QR Code untuk mengisi kuis serta survei secara digital.",
    accent: "#64B5F6",
    position: "right",
  },
  {
    icon: Handshake,
    step: "04",
    title: "Sahkan Komitmen",
    description:
      "Sekolah yang berpartisipasi akan divalidasi dan disahkan dalam peta ekosistem.",
    accent: "#2E7D32",
    position: "bottom",
  },
] as const;

type Step = (typeof steps)[number];

// Orbit positions — cards centered on each axis
const orbitPositions: Record<string, string> = {
  top: "lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2",
  left: "lg:absolute lg:left-0 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2",
  right:
    "lg:absolute lg:right-0 lg:top-1/2 lg:translate-x-1/2 lg:-translate-y-1/2",
  bottom:
    "lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2",
};

const connectors = [
  { x1: "50%", y1: "50%", x2: "50%", y2: "5%", accent: "#38bdf8" },
  { x1: "50%", y1: "50%", x2: "5%", y2: "50%", accent: "#10b981" },
  { x1: "50%", y1: "50%", x2: "95%", y2: "50%", accent: "#8b5cf6" },
  { x1: "50%", y1: "50%", x2: "50%", y2: "95%", accent: "#f59e0b" },
];

const orbitDots = [
  { cx: 340, cy: 52, accent: "#38bdf8" },
  { cx: 52, cy: 340, accent: "#10b981" },
  { cx: 628, cy: 340, accent: "#8b5cf6" },
  { cx: 340, cy: 628, accent: "#f59e0b" },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
  };
}

function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
  };
}

// ── Step Card ──
function StepCard({ step }: { step: Step }) {
  return (
    <div
      className="relative rounded-2xl border p-5 flex flex-col gap-3 overflow-hidden group transition-colors duration-300 bg-white shadow-sm hover:shadow-md"
      style={{
        borderColor: "#e2e8f0",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${step.accent}12 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <span
          className="text-[10px] font-black tracking-widest opacity-40"
          style={{ color: step.accent }}
        >
          {step.step}
        </span>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center border"
          style={{
            backgroundColor: `${step.accent}18`,
            borderColor: `${step.accent}30`,
          }}
        >
          <step.icon className="w-4 h-4" style={{ color: step.accent }} />
        </div>
      </div>

      <h3 className="relative z-10 font-bold text-text-dark text-sm leading-snug">
        {step.title}
      </h3>
      <p className="relative z-10 text-text-dark text-xs leading-relaxed">
        {step.description}
      </p>

      <div
        className="relative z-10 mt-1 h-[1.5px] w-6 rounded-full opacity-40 group-hover:opacity-100 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: step.accent }}
      />
    </div>
  );
}

// ── Center Hub ──
function CenterHub() {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-center p-7 rounded-3xl border bg-white shadow-sm"
      style={{
        borderColor: "rgba(46, 125, 50,0.30)",
        boxShadow: "0 0 60px rgba(46, 125, 50,0.15)",
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(46, 125, 50,0.12) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center mb-4 border"
        style={{
          backgroundColor: "rgba(46, 125, 50,0.15)",
          borderColor: "rgba(46, 125, 50,0.35)",
        }}
      >
        <Scan className="w-5 h-5 text-info" />
      </div>

      <p className="relative z-10 text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1">
        Akses Cepat
      </p>
      <h3 className="relative z-10 font-extrabold text-text-dark text-base leading-tight mb-4">
        Pindai QR
        <br />
        <span className="text-primary">untuk memulai</span>
      </h3>
    </div>
  );
}

// ── Main Section ──
export function ParticipationFlow() {
  return (
    <section
      className="relative py-28 px-4 overflow-hidden bg-surface"
    >
      {/* Radial bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 55%, rgba(46, 125, 50,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Grid dots */}
      {[{ pos: "top-8 left-8" }, { pos: "bottom-8 right-8" }].map(
        ({ pos }, i) => (
          <svg
            key={i}
            className={`absolute ${pos} w-32 h-32 opacity-[0.09] pointer-events-none`}
            viewBox="0 0 110 110"
            fill="none"
          >
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle
                  key={`${r}-${c}`}
                  cx={c * 24 + 10}
                  cy={r * 24 + 10}
                  r="1.5"
                  fill="#2E7D32"
                />
              )),
            )}
          </svg>
        ),
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-info text-xs font-bold uppercase tracking-[0.15em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-info animate-pulse" />
            Alur Partisipasi
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mt-2 mb-4 leading-tight tracking-tight">
            Bagaimana Cara{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2E7D32 0%, #1E88E5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Berpartisipasi?
            </span>
          </h2>
          <p className="text-text-dark max-w-xl mx-auto text-lg font-medium">
            Empat langkah membentuk ekosistem digital yang saling terhubung
            bukan proses linear, tapi komitmen bersama.
          </p>
        </motion.div>

        {/* ── DESKTOP: Orbit Layout ── */}
        <div className="hidden lg:flex justify-center mt-28">
          <div className="relative" style={{ width: 680, height: 680 }}>
            {/* SVG: rings + connectors + dots */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 680 680"
              fill="none"
            >
              {/* Outer ring */}
              <circle
                cx="340"
                cy="340"
                r="295"
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="1"
              />
              {/* Middle ring */}
              <circle
                cx="340"
                cy="340"
                r="205"
                stroke="rgba(0,0,0,0.04)"
                strokeWidth="1"
                strokeDasharray="4 9"
              />

              {/* Connector dashed lines */}
              {connectors.map((c, i) => (
                <motion.line
                  key={i}
                  x1={c.x1}
                  y1={c.y1}
                  x2={c.x2}
                  y2={c.y2}
                  stroke={c.accent}
                  strokeWidth="1"
                  strokeOpacity="0.22"
                  strokeDasharray="4 7"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                />
              ))}

              {/* Accent dots at card anchors */}
              {orbitDots.map((d, i) => (
                <motion.circle
                  key={i}
                  cx={d.cx}
                  cy={d.cy}
                  r="4"
                  fill={d.accent}
                  fillOpacity="0.55"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65 + i * 0.1, duration: 0.3 }}
                />
              ))}
            </svg>

            {/* Step Cards */}
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                {...scaleIn(0.2 + i * 0.1)}
                className={`transform-gpu ${orbitPositions[step.position]}`}
                style={{ width: 196 }}
              >
                <div className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                  <StepCard step={step} />
                </div>
              </motion.div>
            ))}

            {/* Center Hub */}
            <motion.div
              {...scaleIn(0.1)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu will-change-transform"
              style={{ width: 228 }}
            >
              <CenterHub />
            </motion.div>
          </div>
        </div>

        {/* ── MOBILE: Vertical Stack ── */}
        <div className="lg:hidden flex flex-col items-center gap-4">
          {steps.map((step, i) => (
              <motion.div
                key={step.step}
                {...fadeUp(i * 0.1)}
                className="w-full max-w-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              >
              <StepCard step={step} />
            </motion.div>
          ))}
          <motion.div {...fadeUp(0.45)} className="w-full max-w-sm mt-2">
            <CenterHub />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
