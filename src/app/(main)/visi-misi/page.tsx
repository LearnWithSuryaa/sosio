"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, Target, Sparkles, Layers, ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay },
});

const missions = [
  {
    icon: Compass,
    title: "Ekosistem Digital",
    desc: "Kolaborasi aktif antara siswa, guru, dan pemerintah dalam penggunaan gadget yang sehat dan berimbang.",
  },
  {
    icon: Sparkles,
    title: "Literasi Reflektif",
    desc: "Mendorong pola pikir kritis, reflektif, dan bertanggung jawab dalam penggunaan teknologi.",
  },
  {
    icon: Layers,
    title: "Platform Inklusif",
    desc: "Website sebagai sarana monitoring, pembelajaran, dan aspirasi seluruh warga sekolah.",
  },
  {
    icon: Target,
    title: "Model Nasional",
    desc: "Menjadi praktik baik yang dapat direplikasi dan berdampak luas.",
  },
];

export default function VisiMisiPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen overflow-hidden">
      {/* ── HERO (SMOOTH, NOT FULLSCREEN) ───────────────── */}
      <section className="relative pt-40 pb-36 px-4 text-center overflow-hidden">
        {/* ambient */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-orange-100/70 blur-[100px] rounded-full pointer-events-none" />

        {/* smooth fade bottom */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#FAFAFA] pointer-events-none z-10" />

        <motion.div {...fadeUp(0)} className="max-w-4xl mx-auto relative z-20">
          <span className="section-label-light mb-6 inline-block">
            Filosofi Kami
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight">
            Membangun{" "}
            <span className="gradient-text-warm">Generasi Digital</span> yang
            Cerdas & Berkarakter
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Gerakan kolaboratif untuk menciptakan ekosistem digital pendidikan
            yang sehat, bijak, dan berkelanjutan.
          </p>
        </motion.div>
      </section>

      {/* ── VISI (OVERLAP PREMIUM CARD) ───────────────── */}
      <section className="relative -mt-24 pt-24 pb-32 px-4 bg-white rounded-t-[3rem] border-t border-gray-100 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...fadeUp(0)}
            className="clean-card p-6 sm:p-10 md:p-16 border border-orange-100 relative overflow-hidden"
          >
            {/* subtle glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-100 blur-[80px] rounded-full pointer-events-none" />

            <p className="text-orange-500 font-semibold mb-4 tracking-wide">
              VISI
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-[1.4]">
              Terwujudnya{" "}
              <span className="gradient-text-warm">
                Generasi Digital Cerdas, Bijak, dan Berkarakter
              </span>
            </h2>

            <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
              yang mampu mengoptimalkan teknologi untuk masa depan pendidikan
              yang lebih bermartabat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MISI TIMELINE ───────────────── */}
      <section className="py-32 px-4 bg-[#FAFAFA] relative">
        {/* smooth top fade */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Strategi Utama
            </h2>
            <p className="text-gray-600 mt-3">
              Empat langkah untuk mewujudkan visi
            </p>
          </motion.div>

          <div className="relative">
            {/* LINE */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-orange-200 -translate-x-1/2"></div>

            <div className="space-y-16 md:space-y-24">
              {missions.map((m, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={m.title}
                    {...fadeUp(0.1 * i)}
                    className="relative flex items-center justify-center"
                  >
                    {/* DOT PERFECT CENTER OR LEFT ON MOBILE */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full ring-4 ring-[#FAFAFA] z-10"></div>

                    {/* CARD */}
                    <div
                      className={`w-full md:w-1/2 pl-14 pr-0 md:px-0 ${
                        isLeft
                          ? "md:pr-16 md:mr-auto text-left md:text-right"
                          : "md:pl-16 md:ml-auto text-left"
                      }`}
                    >
                      <div className="clean-card p-6 md:p-8 group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <div
                          className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 ${
                            isLeft ? "md:justify-end justify-start" : "justify-start"
                          }`}
                        >
                          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <m.icon className="w-5 h-5 text-orange-500" />
                          </div>

                          <h3 className="text-lg font-bold text-gray-900">
                            {m.title}
                          </h3>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────── */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-orange-500" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Saatnya Mengambil Bagian
          </h2>

          <p className="text-gray-600 text-lg mb-10">
            Bergabunglah dalam gerakan untuk menciptakan ekosistem digital
            pendidikan yang lebih baik.
          </p>

          <Link href="/survei">
            <button className="btn-pill-primary px-10 py-4">
              Mulai Sekarang <ArrowRight className="ml-2 inline w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
