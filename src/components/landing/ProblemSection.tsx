"use client";

import { motion } from "framer-motion";
import { Smartphone, ShieldAlert, Users, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: Smartphone,
    title: "Penyalahgunaan Gadget",
    description:
      "Lebih dari 70% siswa menggunakan smartphone untuk hiburan selama jam pelajaran, bukan untuk belajar.",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    tag: "Krisis",
    tagColor: "bg-red-50 text-red-600 border border-red-200",
  },
  {
    icon: ShieldAlert,
    title: "Literasi Digital Rendah",
    description:
      "Sebagian besar siswa tidak mampu membedakan informasi valid dari hoaks, meningkatkan risiko misinformasi.",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    tag: "Darurat",
    tagColor: "bg-orange-50 text-orange-600 border border-orange-200",
  },
  {
    icon: Users,
    title: "Minimnya Kolaborasi",
    description:
      "Sekolah menangani masalah digital secara terisolasi, tanpa best-practice dari institusi lain.",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    tag: "Tantangan",
    tagColor: "bg-amber-50 text-amber-600 border border-amber-200",
  },
  {
    icon: AlertTriangle,
    title: "Ancaman Cyberbullying",
    description:
      "Kasus perundungan digital meningkat tajam tanpa adanya sistem pelaporan maupun edukasi preventif.",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    tag: "Kritis",
    tagColor: "bg-rose-50 text-rose-600 border border-rose-200",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function ProblemSection() {
  return (
    <section className="py-24 px-4 bg-[#FAFAFA] relative overflow-hidden">
      {/* ===== Background Enhancement (TAMBAHAN) ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff7ed] via-[#fffaf5] to-[#ffffff]" />
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-orange-200/30 blur-3xl rounded-full" />
      <div className="absolute top-40 -right-20 w-[280px] h-[280px] bg-rose-200/30 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ===== HEADER (TETAP, hanya tweak kecil class) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label-light bg-red-50 text-red-600 mb-5">
            Permasalahan
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
            Tantangan <span className="text-rose-500">Penggunaan Gadget</span>
            <br />
            di Lingkungan Sekolah
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Berbagai permasalahan nyata yang dihadapi ekosistem pendidikan
            Indonesia saat ini akibat kurangnya edukasi dan kesadaran digital.
          </p>
        </motion.div>

        {/* ===== GRID (LOGIKA ASLI TIDAK DIUBAH) ===== */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {problems.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="clean-card p-6 flex flex-col items-start bg-white relative overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* ===== Hover Gradient (TAMBAHAN) ===== */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-rose-50/0 group-hover:from-orange-50/40 group-hover:to-rose-50/40 transition duration-300" />

              <span
                className={`relative z-10 inline-block text-xs font-bold px-3 py-1 rounded-full mb-6 ${item.tagColor}`}
              >
                {item.tag}
              </span>

              <div
                className={`relative z-10 w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition duration-300`}
              >
                <item.icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>

              <h3 className="relative z-10 font-bold text-gray-900 mb-3 text-lg leading-snug">
                {item.title}
              </h3>

              <p className="relative z-10 text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
