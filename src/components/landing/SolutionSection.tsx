"use client";

import { motion } from "framer-motion";
import { Activity, Map, ShieldCheck, BookOpen } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Survei Diagnostik",
    description: "Evaluasi penggunaan gadget di lingkungan sekolah untuk memetakan tingkat kesiapan digital.",
    iconColor: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Map,
    title: "Peta Partisipasi",
    description: "Visualisasi sebaran sekolah yang telah berkontribusi dalam gerakan sadar digital nasional.",
    iconColor: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: ShieldCheck,
    title: "Komitmen Digital",
    description: "Penandatanganan kontrak digital resmi sebagai bukti tanggung jawab bersama ekosistem sekolah.",
    iconColor: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: BookOpen,
    title: "Studi Kasus",
    description: "Kumpulan praktik terbaik dari sekolah yang berhasil mengelola ekosistem digital secara efektif.",
    iconColor: "text-rose-500",
    bg: "bg-rose-50",
  },
];

export function SolutionSection() {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label-light bg-orange-50 text-orange-600 mb-5">Solusi Utama</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
            Langkah Nyata{" "}
            <span className="text-orange-500">Kolaboratif</span>
            <br />Berbasis Partisipasi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Empat layanan utama yang menjadi fondasi platform ini dalam mendampingi sekolah membangun ekosistem digital yang sehat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="clean-card p-6 flex flex-col items-start bg-white"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 shadow-sm`}
              >
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>

              <h3 className="font-bold text-gray-900 mb-3 text-lg leading-snug">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
