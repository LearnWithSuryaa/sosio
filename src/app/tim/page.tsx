"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";

// Team array
const team = [
  {
    name: "Muhammad Surya",
    role: "Full Stack Developer",
    image: "/assets/team-0.jpeg",
  },
  {
    name: "Muhammad Alif Dynastiar",
    role: "Ketua",
    image: "/assets/team-2.jpg",
  },
  {
    name: "Jazillah Friskha Reynatasya",
    role: "Media & Informasi",
    image: "/assets/team-1.jpg",
  },
  {
    name: "Zaky Ramadhan Gunawan",
    role: "Teknis Lapangan",
    image: "/assets/team-3.jpg",
  },
  {
    name: "Afriza Dwi Maharani",
    role: "Data Analyst",
    image: "/assets/team-5.jpg",
  },
  {
    name: "⁠Muhammad Fadhlullohi Azka",
    role: "Penyusun Web/ IT",
    image: "/assets/team-4.jpg",
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

export default function TimPengembangPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* ── HEADER & TEAM CAROUSEL ────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden bg-white flex flex-col items-center">
        {/* soft bg blobs - gaya beranda */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        {/* Badge */}
        <motion.div {...fadeUp(0)} className="mb-5 relative z-10">
          <span className="section-label-light bg-orange-50 text-orange-600">
            Tim Layanan
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center max-w-4xl tracking-tight leading-tight mb-6 relative z-10"
        >
          Tim khusus yang <span className="text-orange-500">berdedikasi</span>{" "}
          <br className="hidden md:block" /> untuk sekolah Anda
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg text-gray-600 text-center max-w-2xl font-medium mb-10 leading-relaxed relative z-10"
        >
          Semua anggota tim kami didedikasikan untuk mendukung sekolah dalam
          membangun budaya digital yang cerdas dan positif.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto relative z-10"
        >
          <Link
            href="/visi-misi"
            className="w-full sm:w-auto btn-pill-outline text-sm"
          >
            Visi & Misi
          </Link>
          <Link
            href="/survei"
            className="w-full sm:w-auto btn-pill-primary text-sm"
          >
            Mulai Partisipasi <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Link>
        </motion.div>

        {/* Team Cards Row - mempertahankan layout reverensi tapi dengan border dan shadow beranda */}
        <div className="w-full max-w-7xl relative mx-auto pb-10 z-10">
          <div className="flex justify-center flex-wrap xl:flex-nowrap gap-4 lg:gap-6 px-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(0.2 + i * 0.1)}
                className="group relative w-full sm:w-64 max-w-[260px] aspect-[3/4] rounded-[1.5rem] overflow-hidden cursor-pointer bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:z-10"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill={true}
                  sizes="(max-width: 640px) 100vw, 260px"
                  className="object-cover transition-all duration-500 ease-in-out filter grayscale group-hover:grayscale-0"
                />

                {/* Glass overlay that appears on hover */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <div className="bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl p-3 shadow-lg text-center">
                    <p className="text-gray-900 font-bold text-sm leading-tight">
                      {member.name}
                    </p>
                    <p className="text-orange-500 text-xs font-semibold mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Gradient shadow from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
          {/* Form Section */}
          <div className="flex-1 clean-card p-10 bg-white">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight">
              Hubungi tim layanan
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Depan *
                </label>
                <input
                  type="text"
                  placeholder="Nama awal"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Belakang *
                </label>
                <input
                  type="text"
                  placeholder="Nama akhir"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                placeholder="email@sekolah.sch.id"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pesan
              </label>
              <textarea
                rows={4}
                placeholder="Tuliskan pertanyaan Anda..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors resize-none"
              ></textarea>
            </div>

            <button className="btn-pill-primary w-full text-base py-3.5">
              Kirim Pesan
            </button>
          </div>

          {/* Info Section */}
          <div className="flex-1 flex flex-col justify-center gap-10">
            <motion.div {...fadeUp(0.1)} className="clean-card bg-white p-8">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 shadow-sm">
                <MessageCircle className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                Chat dengan tim kami
              </h3>
              <p className="text-gray-600 text-sm font-medium mb-4 leading-relaxed">
                Tertarik berkolaborasi? Berbicara dengan asisten kami langsung.
              </p>
              <a
                href="mailto:sales@gesemega.id"
                className="font-bold text-gray-900 hover:text-orange-500 transition-colors"
              >
                sales@gesemega.id
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="clean-card bg-white p-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 shadow-sm">
                <Mail className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                Email dukungan
              </h3>
              <p className="text-gray-600 text-sm font-medium mb-4 leading-relaxed">
                Punya pertanyaan seputar platform? Balasan cepat di bawah 24
                jam.
              </p>
              <a
                href="mailto:support@gesemega.id"
                className="font-bold text-gray-900 hover:text-emerald-500 transition-colors"
              >
                support@gesemega.id
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
