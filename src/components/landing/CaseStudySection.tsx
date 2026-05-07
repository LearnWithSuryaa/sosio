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
        tagColor = "bg-orange-500/10 text-orange-400 border-orange-500/20";
        accent = "#f97316"; // orange-500
        break;
      case "pembelajaran":
        tagColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";
        accent = "#3b82f6"; // blue-500
        break;
      case "literasi":
        tagColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        accent = "#10b981"; // emerald-500
        break;
      case "inovasi":
        tagColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";
        accent = "#f43f5e"; // rose-500
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
  }) : fallbackStudies.map(fs => ({
    ...fs,
    tagColor: fs.tagColor.replace('50', '500/10').replace('600', '400').replace('200', '500/20'),
    accent: fs.accent === "text-emerald-500" ? "#10b981" : 
            fs.accent === "text-sky-500" ? "#0ea5e9" : 
            fs.accent === "text-violet-500" ? "#8b5cf6" : "#10b981",
  }));

  return (
    <section className="relative py-28 px-4 overflow-hidden bg-[#050505]">
      {/* ── Dynamic Glowing Mesh ── */}
      <div className="absolute inset-0 bg-white/[0.01] mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-sky-500/10 blur-[130px] rounded-full mix-blend-screen" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-[0.15em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Inspirasi
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight tracking-tight">
            Praktik Baik dari{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sekolah Lain
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
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
              className="relative bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-[24px] p-8 flex flex-col group overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${cs.accent}12 0%, transparent 60%)`,
                }}
              />

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, transparent, ${cs.accent}50, transparent)` }} />

              {/* Tag */}
              <span className={`relative z-10 self-start inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border mb-6 ${cs.tagColor}`}>
                {cs.tag}
              </span>

              {/* Stars */}
              <div className="relative z-10 flex gap-1 mb-5">
                {Array.from({ length: cs.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4" style={{ fill: cs.accent, color: cs.accent }} />
                ))}
              </div>

              <h3 className="relative z-10 text-xl font-bold text-white mb-2 leading-snug">{cs.title}</h3>
              <p className="relative z-10 text-sm font-bold mb-5" style={{ color: cs.accent }}>{cs.school}</p>

              <p className="relative z-10 text-white/50 text-sm leading-relaxed mb-8 flex-1">{cs.story}</p>

              {/* Quote block */}
              <div className="relative z-10 mt-auto pt-5 border-t border-white/10">
                <Quote className="absolute top-3 right-0 w-12 h-12 text-white/5 -z-10" />
                <p className="text-sm italic text-white/40 font-medium leading-relaxed">
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
          className="text-center mt-16"
        >
          <Link href="/studi-kasus">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all duration-300 hover:scale-[1.02]">
              Lihat Semua Studi Kasus
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
