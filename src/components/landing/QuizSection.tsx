"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, ArrowRight, Clock, User, Lock } from "lucide-react";

const benefits = [
  { icon: Clock,         text: "Hanya membutuhkan waktu", bold: "2 menit", suffix: " untuk diselesaikan" },
  { icon: User,          text: "Dapatkan ", bold: "profil kebiasaan digital", suffix: " dan saran personal" },
  { icon: Lock,          text: "", bold: "100% anonim", suffix: " — tidak ada data pribadi yang disimpan" },
];

export function QuizSection() {
  return (
    <section className="relative py-28 px-4 overflow-hidden bg-[#050505]">
      {/* ── Dynamic Glowing Mesh ── */}
      <div className="absolute inset-0 bg-white/[0.01] mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl"
        >
          <div className="grid md:grid-cols-2">

            {/* Left — Visual */}
            <div className="relative p-10 lg:p-12 flex flex-col justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/10" style={{ background: "radial-gradient(circle at top left, rgba(139,92,246,0.15) 0%, transparent 100%)" }}>
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                  className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-6 shadow-sm border border-violet-500/30"
                >
                  <Brain className="w-7 h-7 text-violet-400" />
                </motion.div>

                <h3 className="text-white text-3xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tight">
                  Seberapa Bijak Kamu Menggunakan{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Gadget?
                  </span>
                </h3>
                <p className="text-white/50 font-medium leading-relaxed text-sm md:text-base">
                  5 pertanyaan refleksi singkat untuk mengetahui profil kebiasaan digital Anda. Tanpa penilaian, hanya untuk kesadaran diri.
                </p>
              </div>
            </div>

            {/* Right — CTA */}
            <div className="p-10 lg:p-12 flex flex-col justify-center bg-white/[0.01]">
              <div className="space-y-6 mb-8">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                      <b.icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed pt-2">
                      {b.text}<strong className="text-white font-semibold">{b.bold}</strong>{b.suffix}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Link href="/kuis">
                <button
                  className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-base transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5"
                >
                  Mulai Refleksi
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <p className="text-white/30 font-medium text-xs text-center mt-5 uppercase tracking-wider">Anonim & Gratis · Tidak perlu daftar</p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
