"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  TrendingUp,
  School,
  User,
  Search,
  Sparkles,
  Lock,
  Zap,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface CaseStudy {
  id: string | number;
  judul: string;
  sekolah: string;
  penulis: string;
  isi: string;
  category: "regulasi" | "pembelajaran" | "literasi" | "inovasi";
  impact: string;
  badge: string;
  icon: any;
  color: string;
}

const CATEGORIES = [
  { id: "all", label: "Semua", icon: Sparkles },
  { id: "regulasi", label: "Regulasi", icon: Lock },
  { id: "pembelajaran", label: "Metode Belajar", icon: Zap },
  { id: "literasi", label: "Literasi Digital", icon: ShieldCheck },
  { id: "inovasi", label: "Inovasi Sekolah", icon: TrendingUp },
];

const MOCK_CASES: CaseStudy[] = [
  {
    id: 1,
    judul: "Sistem Loker HP Terpadu: Mengembalikan Fokus di Ruang Kelas",
    sekolah: "SMAN 3 Bandung",
    penulis: "Drs. Hendra Permana",
    isi: "Kami mengimplementasikan sistem loker HP fisik yang wajib diisi sebelum bel masuk. Meski awalnya ada resistensi, dalam satu semester kami melihat peningkatan konsentrasi siswa yang sangat signifikan selama jam KBM.",
    category: "regulasi",
    impact: "+42% Fokus Belajar",
    badge: "Terpopuler",
    icon: Lock,
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    id: 2,
    judul: "Duta Digital Sebaya: Siswa Mengedukasi Siswa",
    sekolah: "SMPN 1 Surabaya",
    penulis: "Ibu Ratna Sari, M.Pd",
    isi: "Alih-alih melarang secara total, kami melatih 20 siswa menjadi Duta Digital. Mereka bertugas memberikan edukasi etika media sosial dan bantuan pertama jika ada indikasi cyberbullying di kalangan teman sebaya.",
    category: "literasi",
    impact: "90% Kasus Teratasi",
    badge: "Inovatif",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  {
    id: 3,
    judul: "Integrasi Podcast sebagai Media Evaluasi Projek P5",
    sekolah: "Sekolah Alam Insan Mulia",
    penulis: "Tim Guru Kreatif",
    isi: "Gadget dialihkan fungsinya untuk memproduksi konten edukatif. Siswa menggunakan smartphone untuk merekam podcast hasil riset lingkungan mereka, mengubah konsumerisme menjadi produktivitas digital.",
    category: "pembelajaran",
    impact: "100% Keterlibatan",
    badge: "Praktik Baik",
    icon: Zap,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    id: 4,
    judul: "Kurikulum 'Offline-First' untuk Kesehatan Mental",
    sekolah: "SMA LabSchool Jakarta",
    penulis: "Konselor Sekolah",
    isi: "Menerapkan jam istirahat bebas gadget (No Screen Zone). Siswa didorong kembali ke permainan fisik dan diskusi tatap muka untuk memperbaiki keterampilan sosial yang sempat menurun pasca-pandemi.",
    category: "inovasi",
    impact: "-30% Tingkat Stres",
    badge: "Teruji",
    icon: TrendingUp,
    color: "bg-rose-50 text-rose-600 border-rose-200",
  },
  {
    id: 5,
    judul: "SOP Penanganan Konten Negatif di Lingkungan Sekolah",
    sekolah: "SMK Medikacom Bandung",
    penulis: "Waka Kesiswaan",
    isi: "Menyusun panduan hukum dan etika yang jelas bagi warga sekolah dalam merespon tren negatif di TikTok/Instagram yang berpotensi mencoreng nama baik sekolah.",
    category: "regulasi",
    impact: "Zero Incident",
    badge: "Keamanan",
    icon: ShieldCheck,
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

export default function StudiKasusPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCases() {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        // Map DB data to our rich interface if needed, or mix them
        setCases(
          data.map((d: any) => ({
            ...d,
            category: d.category || "inovasi",
            impact: d.impact || "Terverifikasi",
            badge: "Update",
            icon: BookOpen,
            color: "bg-orange-50 text-orange-600 border-orange-100",
          }))
        );
      } else {
        setCases(MOCK_CASES);
      }
    }
    fetchCases();
  }, []);

  const filtered = cases.filter((cs) => {
    const matchCat = activeTab === "all" || cs.category === activeTab;
    const matchSearch =
      cs.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.sekolah.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-50 rounded-full blur-3xl opacity-40 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-3 rounded-2xl bg-white shadow-sm border border-orange-100 text-orange-500 mb-6"
          >
            <BookOpen className="w-8 h-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            Studi Kasus & <span className="text-orange-500">Praktik Baik</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Pelajari bagaimana sekolah-sekolah di seluruh Indonesia menghadapi
            tantangan digital dan mengimplementasikan solusi inovatif demi masa
            depan siswa yang lebih cerah.
          </motion.p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mb-12 space-y-8">
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari sekolah atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none transition-all font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeTab === cat.id
                      ? "bg-gray-900 text-white shadow-lg shadow-gray-900/10"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-orange-200 hover:text-orange-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Card (if showing all and first item exists) */}
        <AnimatePresence mode="wait">
          {activeTab === "all" && searchQuery === "" && filtered.length > 0 && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="group relative bg-[#111] rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent)] pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                      Studi Kasus Pilihan
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                      {filtered[0].judul}
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
                      &quot;{filtered[0].isi}&quot;
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-white/80 font-bold">
                        <School className="w-5 h-5 text-orange-400" />
                        {filtered[0].sekolah}
                      </div>
                      <div className="flex items-center gap-2 text-white/80 font-bold">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        {filtered[0].impact}
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-auto">
                    <button className="w-full md:w-auto bg-white hover:bg-orange-50 text-gray-900 font-black px-8 py-5 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95">
                      Baca Selengkapnya <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered
              .slice(activeTab === "all" && searchQuery === "" ? 1 : 0)
              .map((cs, i) => {
                const Icon = cs.icon;
                return (
                  <motion.div
                    key={cs.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="clean-card bg-white p-6 h-full flex flex-col group hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${cs.color}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                          {cs.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-snug group-hover:text-orange-600 transition-colors">
                        {cs.judul}
                      </h3>
                      
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-4 italic border-l-2 border-orange-100 pl-4 py-1">
                        &quot;{cs.isi}&quot;
                      </p>

                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <School className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-bold text-gray-700">
                            {cs.sekolah}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-[11px] font-medium text-gray-400">
                              {cs.penulis}
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {cs.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Studi kasus tidak ditemukan
            </h3>
            <p className="text-gray-500">
              Coba gunakan kategori lain atau kata kunci pencarian yang berbeda.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20">
          <div className="bg-orange-500 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-500/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Punya Praktik Baik di Sekolah Anda?
              </h2>
              <p className="text-white/80 text-lg mb-10 font-medium leading-relaxed">
                Jadilah inspirasi bagi sekolah lain. Bagikan pengalaman unik sekolah Anda dalam membangun ekosistem digital yang sehat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link href="/survei" className="flex-1 sm:flex-initial">
                  <button className="w-full bg-white text-orange-600 font-black px-8 py-5 rounded-2xl shadow-xl hover:bg-orange-50 transition-all active:scale-95">
                    Daftarkan Sekolah Sekarang
                  </button>
                </Link>
                <button className="flex-1 sm:flex-initial bg-orange-600 text-white border border-white/20 font-black px-8 py-5 rounded-2xl hover:bg-orange-700 transition-all active:scale-95">
                  Hubungi Tim Riset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
