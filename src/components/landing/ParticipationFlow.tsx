"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, MapPin, Handshake, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Pelajari Panduan",
    description: "Unduh dan pahami panduan serta template kebijakan digital untuk sekolah Anda.",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Terapkan Kebijakan",
    description: "Sesuaikan template dengan kondisi sekolah dan sosialisasikan kebijakan baru.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Buat Komitmen Bersama",
    description: "Sahkan kontrak digital dan dapatkan sertifikat resmi sebagai bukti dedikasi.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Lihat Dampak Partisipasi",
    description: "Pantau perkembangan gerakan nasional dan pelajari dari keberhasilan sekolah lain.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

export function ParticipationFlow() {
  return (
    <section className="py-24 px-4 bg-gradient-warm relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label-light mb-5">Alur Partisipasi</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
            Bagaimana Cara{" "}
            <span className="text-orange-500">Berpartisipasi?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Hanya 4 langkah sederhana untuk menjadikan sekolah Anda bagian dari gerakan sadar digital nasional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden lg:flex absolute top-12 left-0 right-0 items-center justify-between px-[12.5%] pointer-events-none z-0">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="flex-1 mx-2"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              >
                <div className="h-0.5 bg-gray-200 relative">
                  <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>

          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative z-10 flex flex-col items-center text-center clean-card bg-white p-6"
            >
              {/* Icon container */}
              <div
                className={`relative w-20 h-20 rounded-2xl ${item.bg} flex items-center justify-center mb-6 shadow-sm`}
              >
                <item.icon className={`w-8 h-8 ${item.color}`} />
                {/* Step badge */}
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-black text-gray-900 shadow-md border border-gray-100">
                  {item.step}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link href="/panduan">
            <Button variant="primary" className="px-8 py-3.5 mx-auto">
              Ikuti Tahap 1: Pelajari Panduan
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
