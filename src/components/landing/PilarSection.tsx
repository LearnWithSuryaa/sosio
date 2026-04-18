"use client";

import { motion } from "framer-motion";
import { Activity, Map, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Activity,
    title: "Survei Evaluasi",
    description: "Menilai tingkat kecanduan dan pemanfaatan gadget di lingkungan sekolah secara anonim dan aman.",
    gradient: "from-sky-500 to-blue-600",
    glow: "#38BDF8",
  },
  {
    icon: Map,
    title: "Peta Partisipasi",
    description: "Visualisasi waktu-nyata penyebaran sekolah yang berkontribusi dalam gerakan sadar digital.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "#34D399",
  },
  {
    icon: ShieldCheck,
    title: "Kontrak Digital",
    description: "Penandatanganan komitmen nyata perlindungan pendidikan digital dengan sertifikat resmi elektronik.",
    gradient: "from-violet-500 to-purple-600",
    glow: "#A78BFA",
  },
];

export function PilarSection() {
  return (
    <section className="py-20 px-4 w-full max-w-6xl mx-auto flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-white mb-14 text-center"
      >
        Pilar{" "}
        <span className="gradient-text">Ekosistem</span>{" "}
        Kami
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="glass-card rounded-2xl p-8 flex flex-col items-center text-center group"
            style={{ borderColor: `${pillar.glow}20` }}
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              style={{ boxShadow: `0 8px 25px ${pillar.glow}40` }}
            >
              <pillar.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{pillar.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
