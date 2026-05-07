"use client";

import { motion } from "framer-motion";
import { Smartphone, ShieldAlert, Users, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: Smartphone,
    title: "Distraksi Gadget di Kelas",
    description:
      "Penggunaan smartphone di lingkungan sekolah sering kali tidak terkontrol. Alih-alih membantu proses belajar, gadget justru membuat siswa kehilangan fokus karena lebih tertarik pada media sosial, game, dan hiburan digital lainnya. Kondisi ini berdampak langsung pada konsentrasi dan kualitas pembelajaran di kelas.",
    stat: "70%",
    color: "#f97316",
    size: "large",
  },
  {
    icon: ShieldAlert,
    title: "Sulit Membedakan Informasi",
    description:
      "Banyak siswa masih belum mampu memilah informasi yang benar dan yang menyesatkan di internet.",
    stat: "60%",
    color: "#ef4444",
    size: "normal",
  },
  {
    icon: Users,
    title: "Kurangnya Kerja Sama",
    description:
      "Pengawasan aktivitas digital siswa masih belum berjalan optimal antara sekolah, guru, dan orang tua.",
    stat: "80%",
    color: "#f59e0b",
    size: "normal",
  },
  {
    icon: AlertTriangle,
    title: "Meningkatnya Risiko Cyberbullying",
    description:
      "Interaksi digital yang semakin intens membuka peluang lebih besar terjadinya cyberbullying. Tanpa edukasi dan pengawasan yang tepat, hal ini dapat berdampak pada kesehatan mental, rasa aman, dan perkembangan sosial siswa di lingkungan sekolah maupun di luar sekolah.",
    stat: "90%",
    color: "#f43f5e",
    size: "wide",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden py-28 px-6 bg-[#050505]">
      {/* Lightweight texture */}
      <div className="absolute inset-0 bg-white/[0.01] mix-blend-overlay" />

      {/* Optimized blur orbs for Vite-style mesh */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-orange-500/15 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-[130px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-orange-400 mb-5">
            Problem Mapping
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight">
            Realita Digital
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
              di Dunia Pendidikan
            </span>
          </h2>

          <p className="mt-6 text-base md:text-lg text-white/50 leading-relaxed max-w-xl">
            Transformasi digital menghadirkan peluang besar sekaligus tantangan
            yang membutuhkan literasi, pengawasan, dan kolaborasi yang lebih
            baik.
          </p>
        </motion.div>

        {/* Optimized Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[220px]"
        >
          {problems.map((item, index) => {
            const Icon = item.icon;

            let sizeClass = "";

            if (item.size === "large") {
              sizeClass = "md:col-span-3 md:row-span-2";
            }

            if (item.size === "normal") {
              sizeClass = "md:col-span-3";
            }

            if (item.size === "wide") {
              sizeClass = "md:col-span-6";
            }

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                }}
                className={`
                  ${sizeClass}
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  backdrop-blur-sm
                  p-7
                  transform-gpu
                  will-change-transform
                `}
              >
                {/* Lightweight hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${item.color}14, transparent 65%)`,
                  }}
                />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Top Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}25`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>

                    <span
                      className="text-3xl md:text-4xl font-black tabular-nums"
                      style={{ color: item.color }}
                    >
                      {item.stat}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-6 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: item.stat,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>

                {/* Optimized corner glow */}
                <div
                  className="absolute -bottom-6 -right-6 w-24 h-24 opacity-10 blur-xl pointer-events-none"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
