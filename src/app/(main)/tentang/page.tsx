"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Target,
  Globe2,
  ShieldCheck,
  Users,
  School,
  ArrowRight,
  BookOpen,
  Handshake,
} from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Berorientasi Dampak",
    description:
      "Setiap fitur dirancang untuk menghasilkan perubahan nyata di ekosistem pendidikan digital Indonesia.",
    iconColor: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Globe2,
    title: "Jangkauan Nasional",
    description:
      "Menghubungkan ribuan sekolah dari Sabang sampai Merauke dalam satu gerakan kolaboratif.",
    iconColor: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: ShieldCheck,
    title: "Berbasis Komitmen",
    description:
      "Mendorong sekolah untuk tidak hanya berpartisipasi, tetapi juga berkomitmen secara resmi.",
    iconColor: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: BookOpen,
    title: "Berbagi Pengetahuan",
    description:
      "Platform studi kasus yang menampilkan praktik terbaik dari sekolah-sekolah pelopor digital.",
    iconColor: "text-rose-500",
    bg: "bg-rose-50",
  },
];

const milestones = [
  {
    year: "2026",
    label: "Titik Awal Kegelisahan",
    desc: "Berawal dari obrolan kedai kopi tentang kekhawatiran layar gadget yang perlahan menggeser konsentrasi belajar dan interaksi sosial anak.",
  },
  {
    year: "2026",
    label: "Langkah Kolaborasi",
    desc: "Mengubah keresahan menjadi tindakan nyata dengan merancang gerakan inovatif yang melibatkan partisipasi aktif siswa, guru, orang tua, dan sekolah.",
  },
  {
    year: "2026",
    label: "Lahirnya GESAMEGA",
    desc: "Peluncuran gerakan untuk mengelola teknologi secara bijak, mengubahnya dari ancaman menjadi jembatan menuju generasi yang cerdas dan seimbang.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

export default function TentangKamiPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden bg-white">
        {/* soft bg blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <span className="section-label-light bg-orange-50 text-orange-600 mb-5">
              Tentang Kami
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight tracking-tight"
          >
            Gerakan Digital{" "}
            <span className="text-orange-500">untuk Sekolah</span> Indonesia
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            GESEMEGA adalah platform kolaboratif nasional yang membantu sekolah
            membangun ekosistem digital yang sehat, terukur, dan berdampak nyata
            bagi kualitas pendidikan Indonesia.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-wrap gap-4 justify-center mt-10"
          >
            <Link href="/artikel">
              <button className="btn-pill-primary text-sm">
                Baca Wawasan <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            </Link>
            <Link href="/visi-misi">
              <button className="btn-pill-outline text-sm">
                Visi &amp; Misi
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-gradient-to-r from-orange-500 to-rose-500">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {[
            { value: "3.600+", label: "Sekolah Terdaftar", icon: School },
            { value: "34", label: "Provinsi", icon: Globe2 },
            {
              value: "1.200+",
              label: "Komitmen Ditanda-tangani",
              icon: Handshake,
            },
            { value: "98%", label: "Kepuasan Peserta", icon: Users },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp(i * 0.08)}
              className="flex flex-col items-center gap-1"
            >
              <s.icon className="w-6 h-6 opacity-80 mb-1" />
              <p className="text-3xl font-black tracking-tight">{s.value}</p>
              <p className="text-sm font-medium opacity-80">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PILLAR CARDS ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="section-label-light bg-orange-50 text-orange-600 mb-5">
              Nilai Kami
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
              Fondasi yang <span className="text-orange-500">Kami Pegang</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="clean-card p-6 flex flex-col items-start bg-white"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${p.bg} flex items-center justify-center mb-6 shadow-sm`}
                >
                  <p.icon className={`w-7 h-7 ${p.iconColor}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg leading-snug">
                  {p.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MILESTONE TIMELINE ────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="section-label-light bg-orange-50 text-orange-600 mb-5">
              Perjalanan
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
              Dari Ide ke{" "}
              <span className="text-orange-500">Gerakan Nasional</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.label}
                  {...fadeUp(i * 0.15)}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* content */}
                  <div
                    className={`clean-card p-6 bg-white ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"}`}
                  >
                    <span className="section-label-light bg-orange-50 text-orange-600 mb-3 text-xs">
                      {m.year}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg mt-2 mb-2">
                      {m.label}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  {/* dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#FAFAFA]">
        <motion.div
          {...fadeUp(0)}
          className="max-w-3xl mx-auto clean-card bg-white p-10 md:p-14 text-center"
        >
          <span className="section-label-light bg-orange-50 text-orange-600 mb-5">
            Bergabung
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
            Jadikan Sekolahmu
            <br />
            <span className="text-orange-500">Bagian dari Gerakan</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg font-medium">
            Jelajahi berbagai wawasan dan panduan untuk membangun ekosistem
            digital yang lebih sehat di sekolah Anda.
          </p>
          <Link href="/artikel">
            <button className="btn-pill-primary text-sm">
              Mulai Membaca <ArrowRight className="w-4 h-4 ml-2 inline" />
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
