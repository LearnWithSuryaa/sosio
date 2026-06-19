"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download } from "lucide-react";

export function SuccessScreen({ sekolah }: { sekolah: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "rgba(16,185,129,0.15)",
          boxShadow: "0 0 50px rgba(16,185,129,0.30)",
          color: "#10b981",
        }}
      >
        <CheckCircle2 className="w-12 h-12" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-extrabold text-text-dark mb-4"
      >
        Komitmen Berhasil Disahkan!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-md mb-8 text-lg"
        style={{ color: "rgba(55, 71, 79, 0.6)" }}
      >
        Sertifikat PDF komitmen digital Anda telah diunduh. Terima kasih atas
        partisipasi aktif <strong className="text-text-dark">{sekolah}</strong>{" "}
        dalam menjaga ekosistem pendidikan digital.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={() => (window.location.href = "/peta")}
        className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg, #2E7D32, #66BB6A)",
          boxShadow: "0 0 32px rgba(46, 125, 50,0.40)",
        }}
      >
        <Download className="w-5 h-5" /> Beralih ke Peta Partisipasi
      </motion.button>
    </div>
  );
}
