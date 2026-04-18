"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Info, ArrowRight } from "lucide-react";

export function MapPreview() {
  return (
    <section className="py-24 px-4 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label-light bg-emerald-50 text-emerald-600 mb-5">
            Social Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
            Peta Partisipasi{" "}
            <span className="text-emerald-500">Nasional</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Lihat sebaran sekolah di seluruh Indonesia yang telah bergabung dalam gerakan ekosistem digital.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="clean-card overflow-hidden bg-white"
        >
          {/* Map area */}
          <div className="w-full h-[400px] bg-slate-50 flex items-center justify-center relative overflow-hidden rounded-t-3xl border-b border-gray-100">
            {/* Simulated map grid */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

            {/* Top fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 via-transparent to-slate-50/40 pointer-events-none" />

            {/* Animated markers */}
            {[
              { top: "30%", left: "35%", color: "#10B981", pulse: true }, // emerald-500
              { top: "40%", left: "45%", color: "#10B981", pulse: false },
              { top: "35%", left: "50%", color: "#F59E0B", pulse: true }, // amber-500
              { top: "45%", left: "38%", color: "#F59E0B", pulse: false },
              { top: "50%", left: "55%", color: "#94A3B8", pulse: false }, // slate-400
              { top: "25%", left: "42%", color: "#10B981", pulse: true },
              { top: "55%", left: "60%", color: "#F59E0B", pulse: true },
            ].map((marker, i) => (
              <div
                key={i}
                className="absolute"
                style={{ top: marker.top, left: marker.left }}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full ${marker.pulse ? "animate-pulse" : ""}`}
                  style={{
                    background: marker.color,
                    boxShadow: `0 0 0 4px ${marker.color}30`
                  }}
                />
              </div>
            ))}

            {/* Center card */}
            <div className="relative z-10 bg-white border border-gray-200 shadow-xl rounded-2xl px-8 py-6 text-center max-w-sm">
              <p className="text-gray-900 font-bold text-lg mb-1">Peta Interaktif Tersedia</p>
              <p className="text-gray-500 text-sm mb-6">Klik untuk melihat peta lengkap dengan data real-time</p>
              <Link href="/peta">
                <button className="btn-pill-primary w-full shadow-orange-500/20 text-sm">
                  Buka Peta Lengkap
                </button>
              </Link>
            </div>
          </div>

          {/* Legend bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-5 px-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Info className="w-4 h-4" />
              <span className="font-semibold">Keterangan:</span>
            </div>
            {[
              { color: "#10B981", label: "Sudah Komitmen" },
              { color: "#F59E0B", label: "Sudah Survei" },
              { color: "#94A3B8", label: "Belum Ikut" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm font-medium">
                <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
