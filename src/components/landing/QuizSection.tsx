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
    <section className="py-24 px-4 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="clean-card rounded-3xl overflow-hidden bg-white"
        >
          <div className="grid md:grid-cols-2">

            {/* Left — Visual */}
            <div className="relative p-10 flex flex-col justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 border-r border-gray-100">
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                  className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm border border-violet-100"
                >
                  <Brain className="w-7 h-7 text-violet-500" />
                </motion.div>

                <h3 className="text-gray-900 text-3xl font-extrabold mb-3 leading-tight tracking-tight">
                  Seberapa Bijak Kamu Menggunakan{" "}
                  <span className="text-violet-600">Gadget?</span>
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed text-sm">
                  5 pertanyaan refleksi singkat untuk mengetahui profil kebiasaan digital Anda. Tanpa penilaian, hanya untuk kesadaran diri.
                </p>
              </div>
            </div>

            {/* Right — CTA */}
            <div className="p-10 flex flex-col justify-center">
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
                    <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                      <b.icon className="w-4 h-4 text-violet-600" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed pt-2">
                      {b.text}<strong className="text-gray-900">{b.bold}</strong>{b.suffix}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Link href="/kuis">
                <button
                  className="btn-pill-primary w-full shadow-violet-500/25 bg-violet-600 hover:bg-violet-700"
                >
                  Mulai Refleksi
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>

              <p className="text-gray-400 font-medium text-xs text-center mt-4">Anonim & Gratis · Tidak perlu daftar akun</p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
