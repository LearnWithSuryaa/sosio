"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Info, BadgeCheck, ClipboardList, MapPin } from "lucide-react";

// ── Load Leaflet hanya di client side (tidak SSR) ──────────────────────────
const MapPreviewInner = dynamic(
  () => import("@/components/landing/MapPreviewInner"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] bg-slate-100 animate-pulse rounded-t-3xl" />
    ),
  }
);

export function MapPreview() {
  return (
    <section className="py-24 px-4 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
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
            Lihat sebaran sekolah di seluruh Indonesia yang telah bergabung
            dalam gerakan ekosistem digital.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="clean-card overflow-hidden bg-white"
        >
          {/* Map area */}
          <div className="relative w-full h-[420px] overflow-hidden rounded-t-3xl">
            {/* Real map — semua interaksi dinonaktifkan */}
            <MapPreviewInner />

            {/* Gradient overlay — menghalangi interaksi & memberi efek preview */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* fade bawah lebih kuat */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/95 via-white/50 to-transparent" />
              {/* fade samping tipis */}
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/40 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/40 to-transparent" />
            </div>

            {/* Invisible interaction blocker — mencegah zoom / drag */}
            <div className="absolute inset-0 z-30 cursor-default" />

            {/* CTA card di tengah */}
            <div className="absolute inset-0 z-40 flex items-end justify-center pb-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl px-8 py-6 text-center max-w-sm pointer-events-auto"
              >
                <p className="text-gray-900 font-bold text-lg mb-1">
                  Peta Interaktif Tersedia
                </p>
                <p className="text-gray-500 text-sm mb-5">
                  Klik untuk melihat peta lengkap dengan data real-time
                </p>
                <Link href="/survei" className="block">
                  <Button variant="primary" className="w-full text-sm py-2">
                    Mulai Survei Instansi
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Legend bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-5 px-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Info className="w-4 h-4" />
              <span className="font-semibold">Keterangan:</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <BadgeCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-600">Sudah Komitmen</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <ClipboardList className="w-4 h-4 text-amber-500" />
              <span className="text-gray-600">Sudah Survei</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-gray-600">Belum Ikut</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
