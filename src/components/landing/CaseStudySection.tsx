"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, ArrowRight, Star } from "lucide-react";

const fallbackStudies = [
  {
    id: "fallback-1",
    title: "Penerapan Loker HP Saat Jam KBM",
    school: "SMAN 3 Bandung",
    story: "Menerapkan sistem loker HP di setiap awal kelas. Awalnya siswa keberatan, namun dalam 3 bulan fokus belajar meningkat 40% dan nilai ujian naik signifikan.",
    quote: "Disiplin digital dimulai dari hal kecil yang konsisten.",
    tag: "Kebijakan Sekolah",
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    accent: "text-emerald-500",
    stars: 5,
  },
  {
    id: "fallback-2",
    title: "Duta Digital Sebaya",
    school: "SMPN 1 Surabaya",
    story: "Siswa yang memahami literasi digital dipilih sebagai duta sebaya untuk mengedukasi teman-temannya menghindari cyberbullying dan konten negatif.",
    quote: "Edukasi terbaik datang dari teman sebaya yang dipercaya.",
    tag: "Peer Education",
    tagColor: "bg-sky-50 text-sky-600 border-sky-200",
    accent: "text-sky-500",
    stars: 5,
  },
  {
    id: "fallback-3",
    title: "Jam Gadget Terjadwal",
    school: "SMPN 5 Yogyakarta",
    story: "Mengalokasikan 30 menit sebelum dan sesudah jam pelajaran sebagai 'jam gadget bebas', sementara jam efektif belajar bebas dari distraksi digital.",
    quote: "Bukan melarang, tapi mengajarkan kontrol diri.",
    tag: "Manajemen Waktu",
    tagColor: "bg-violet-50 text-violet-600 border-violet-200",
    accent: "text-violet-500",
    stars: 5,
  },
];

interface CaseStudySectionProps {
  caseStudies?: any[];
}

export function CaseStudySection({ caseStudies = [] }: CaseStudySectionProps) {
  const displayStudies = caseStudies.length > 0 ? caseStudies.map(cs => {
    let tagColor = "bg-gray-50 text-gray-600 border-gray-200";
    let accent = "text-gray-500";
    
    switch (cs.category) {
      case "regulasi":
        tagColor = "bg-orange-50 text-orange-600 border-orange-200";
        accent = "text-orange-500";
        break;
      case "pembelajaran":
        tagColor = "bg-blue-50 text-blue-600 border-blue-200";
        accent = "text-blue-500";
        break;
      case "literasi":
        tagColor = "bg-emerald-50 text-emerald-600 border-emerald-200";
        accent = "text-emerald-500";
        break;
      case "inovasi":
        tagColor = "bg-rose-50 text-rose-600 border-rose-200";
        accent = "text-rose-500";
        break;
    }

    return {
      id: cs.id,
      title: cs.judul,
      school: cs.schools?.nama_sekolah || "Sekolah Tidak Diketahui",
      story: cs.isi ? (cs.isi.length > 150 ? cs.isi.substring(0, 150) + "..." : cs.isi) : "",
      quote: cs.impact || "Mengembangkan ekosistem digital yang sehat.",
      tag: cs.badge || "Praktik Baik",
      tagColor,
      accent,
      stars: 5,
    };
  }) : fallbackStudies;

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
          <span className="section-label-light bg-emerald-50 text-emerald-600 mb-5">
            Inspirasi
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
            Praktik Baik dari{" "}
            <span className="text-emerald-500">Sekolah Lain</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Pelajari pendekatan inovatif yang telah terbukti berhasil dalam mengelola penggunaan gadget di lingkungan sekolah.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayStudies.map((cs, i) => (
            <motion.div
              key={cs.id || cs.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="clean-card bg-white rounded-2xl p-7 relative flex flex-col"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />

              {/* Tag */}
              <span className={`self-start inline-block text-xs font-bold px-3 py-1 rounded-full border mb-5 ${cs.tagColor}`}>
                {cs.tag}
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: cs.stars }).map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 fill-current ${cs.accent}`} />
                ))}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{cs.title}</h3>
              <p className={`text-sm font-bold mb-4 ${cs.accent}`}>{cs.school}</p>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{cs.story}</p>

              {/* Quote block */}
              <div className="relative mt-auto pt-4 border-t border-gray-100">
                <Quote className="absolute top-2 right-2 w-12 h-12 text-gray-100 -z-10" />
                <p className="text-sm italic text-gray-500 font-medium leading-relaxed">
                  &ldquo;{cs.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/studi-kasus">
            <button className="btn-pill-outline px-8 py-3.5 mx-auto text-sm">
              Lihat Semua Studi Kasus
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
