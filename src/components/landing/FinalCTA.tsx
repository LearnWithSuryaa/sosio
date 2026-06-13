"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="py-32 px-4 relative overflow-hidden bg-surface-alt">
      {/* ── Dynamic Glowing Mesh ── */}
      <div className="absolute inset-0 bg-white/50 mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-soft/50 rounded-[100%] blur-[150px] mix-blend-multiply pointer-events-none" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary-soft bg-white text-primary text-sm font-bold tracking-wide mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          Bergabung Sekarang
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-extrabold text-text-dark mb-6 leading-tight tracking-tight"
        >
          Mari Berpartisipasi Membangun{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(135deg, #64B5F6 0%, #2E7D32 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ekosistem Pendidikan Digital
          </span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="text-text-dark font-medium text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Setiap sekolah yang berpartisipasi membawa Indonesia selangkah lebih
          dekat menuju pendidikan digital yang aman, terukur, dan berkualitas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/komitmen" className="w-full sm:w-auto relative group">
            <Button
              variant="primary"
              className="w-full sm:w-auto px-10 py-4 shadow-primary/20 text-base relative z-10 transition-transform active:scale-95 hover:shadow-primary/40"
            >
              <span className="flex items-center gap-2">
                Buat Komitmen Sekarang{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-slate-500 text-sm font-medium tracking-wide"
        >
          Bergabung bersama{" "}
          <strong className="text-text-dark">500+ sekolah</strong> yang telah
          berpartisipasi dari seluruh Kota Sidoarjo
        </motion.p>
      </div>
    </section>
  );
}
