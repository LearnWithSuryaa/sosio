"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Tag,
  ArrowRight,
  Search,
  Sparkles,
  Smartphone,
  Brain,
  Shield,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  { label: "Semua", value: "all", icon: Sparkles },
  { label: "Literasi Digital", value: "literasi", icon: Brain },
  { label: "Kebijakan Sekolah", value: "kebijakan", icon: Shield },
  { label: "Kesehatan Digital", value: "kesehatan", icon: Smartphone },
  { label: "Panduan Guru", value: "guru", icon: GraduationCap },
];

const MOCK_ARTICLES = [
  {
    id: 1,
    slug: "dampak-gadget-terhadap-konsentrasi-belajar",
    category: "kesehatan",
    badge: "Riset Terbaru",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
    title: "Dampak Paparan Gadget Berlebih terhadap Konsentrasi Belajar Siswa",
    excerpt:
      "Studi dari Universitas Indonesia menemukan bahwa siswa yang menghabiskan lebih dari 4 jam/hari di media sosial mengalami penurunan rentang perhatian hingga 37% dibanding dekade sebelumnya.",
    author: "Dr. Sari Handayani, M.Psi",
    authorRole: "Psikolog Pendidikan",
    readTime: "5 menit",
    date: "12 Apr 2025",
    tags: ["kesehatan mental", "fokus belajar", "screen time"],
    featured: true,
  },
  {
    id: 2,
    slug: "panduan-implementasi-kebijakan-hp-sekolah",
    category: "kebijakan",
    badge: "Panduan Praktis",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    title: "Panduan Langkah demi Langkah: Implementasi Kebijakan HP di Sekolah",
    excerpt:
      "Mengadopsi kebijakan pembatasan gadget bukan hal mudah. Artikel ini memandu kepala sekolah dan guru mulai dari sosialisasi, penyusunan aturan tertulis, hingga penegakan yang humanis.",
    author: "Tim GESAMEGA",
    authorRole: "Divisi Riset & Kebijakan",
    readTime: "8 menit",
    date: "9 Apr 2025",
    tags: ["kebijakan sekolah", "implementasi", "manajemen"],
    featured: true,
  },
  {
    id: 3,
    slug: "literasi-digital-bukan-sekadar-melarang",
    category: "literasi",
    badge: "Opini",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
    title: "Literasi Digital Bukan Sekadar Melarang: Membangun Ekosistem yang Sehat",
    excerpt:
      "Melarang gadget tanpa edukasi hanya memindahkan masalah. Pendekatan holistik yang membangun kesadaran kritis siswa terbukti lebih efektif dalam jangka panjang.",
    author: "Budi Santoso, S.Pd",
    authorRole: "Guru SMK, Aktivis Pendidikan",
    readTime: "6 menit",
    date: "5 Apr 2025",
    tags: ["literasi digital", "edukasi", "pendekatan holistik"],
    featured: false,
  },
  {
    id: 4,
    slug: "teknik-pomodoro-di-kelas",
    category: "guru",
    badge: "Tips & Trik",
    badgeColor: "bg-orange-50 text-orange-600 border-orange-200",
    title: "Teknik Pomodoro di Kelas: Cara Guru Menjaga Fokus Siswa Tanpa Larangan Keras",
    excerpt:
      "Teknik Pomodoro yang populer di dunia kerja kini diadaptasi ke dalam metode pembelajaran. Bagaimana guru bisa memanfaatkannya tanpa konflik dengan siswa?",
    author: "Rina Kusuma, M.Pd",
    authorRole: "Trainer Pendidikan",
    readTime: "4 menit",
    date: "1 Apr 2025",
    tags: ["metode belajar", "fokus", "teknik mengajar"],
    featured: false,
  },
  {
    id: 5,
    slug: "permendikbud-regulasi-gadget",
    category: "kebijakan",
    badge: "Regulasi",
    badgeColor: "bg-red-50 text-red-600 border-red-200",
    title: "Permendikbud & Surat Edaran: Apa yang Harus Diketahui Sekolah tentang Regulasi Gadget",
    excerpt:
      "Rangkuman lengkap regulasi nasional terkait penggunaan perangkat digital di sekolah, disertai interpretasi praktis bagi kepala sekolah dan komite sekolah.",
    author: "Tim Legal GESAMEGA",
    authorRole: "Analis Kebijakan Pendidikan",
    readTime: "10 menit",
    date: "28 Mar 2025",
    tags: ["regulasi", "hukum pendidikan", "Kemendikbud"],
    featured: false,
  },
  {
    id: 6,
    slug: "peran-orang-tua-ekosistem-digital",
    category: "literasi",
    badge: "Perspektif",
    badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
    title: "Sinergi Sekolah dan Orang Tua: Kunci Ekosistem Digital yang Sehat",
    excerpt:
      "Kebijakan sekolah hanya efektif jika didukung di rumah. Bagaimana membangun komunikasi yang kuat antara guru, siswa, dan orang tua dalam isu gadget?",
    author: "Prof. Hendra Wijaya",
    authorRole: "Sosiolog Pendidikan, UI",
    readTime: "7 menit",
    date: "22 Mar 2025",
    tags: ["peran orang tua", "sinergi", "ekosistem"],
    featured: false,
  },
];

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setArticles(
          data.map((d: any, index: number) => {
            let badgeColor = "bg-gray-50 text-gray-600 border-gray-200";
            let badge = "Artikel";
            switch (d.kategori) {
              case "literasi":
                badgeColor = "bg-purple-50 text-purple-600 border-purple-200";
                badge = "Edukasi";
                break;
              case "kebijakan":
                badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-200";
                badge = "Panduan Praktis";
                break;
              case "kesehatan":
                badgeColor = "bg-blue-50 text-blue-600 border-blue-200";
                badge = "Riset Terbaru";
                break;
              case "guru":
                badgeColor = "bg-orange-50 text-orange-600 border-orange-200";
                badge = "Tips & Trik";
                break;
            }

            const dateStr = new Date(d.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return {
              id: d.id,
              slug: d.id,
              category: d.kategori || "all",
              badge,
              badgeColor,
              title: d.judul,
              excerpt: d.isi ? (d.isi.length > 120 ? d.isi.substring(0, 120) + "..." : d.isi) : "",
              author: d.penulis,
              authorRole: "Kontributor",
              readTime: Math.max(1, Math.ceil((d.isi?.length || 0) / 1000)) + " menit",
              date: dateStr,
              tags: [d.kategori || "umum"],
              featured: index === 0,
              thumbnail: d.thumbnail_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            };
          })
        );
      } else {
        setArticles(MOCK_ARTICLES);
      }
      setLoading(false);
    }
    fetchArticles();
  }, []);

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "all" || a.category === activeCategory;
    const matchSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = articles.filter((a) => a.featured);
  const showFeatured = activeCategory === "all" && searchQuery === "";

  return (
    <div className="min-h-[90vh] bg-[#FAFAFA] pt-28 pb-16 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex p-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-orange-500 mb-5">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Artikel & Edukasi
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Wawasan, riset, dan panduan praktis seputar ekosistem pendidikan
            digital yang sehat untuk komunitas sekolah Indonesia.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-orange-200 hover:text-orange-600"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Featured Articles */}
        {showFeatured && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <h2 className="text-sm font-black uppercase tracking-widest text-orange-500">
                Artikel Pilihan
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link href={`/artikel/${article.slug}`}>
                    <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-100 transition-all duration-300 p-7 h-full flex flex-col cursor-pointer overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-rose-400" />
                      <span
                        className={`inline-block self-start px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border mb-4 ${article.badgeColor}`}
                      >
                        {article.badge}
                      </span>
                      <h2 className="text-xl font-extrabold text-gray-900 mb-3 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-800">
                            {article.author}
                          </p>
                          <p className="text-xs text-gray-400">
                            {article.authorRole}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {article.readTime}
                          </span>
                          <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Grid */}
        <div>
          {!showFeatured && (
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">
                {filtered.length} Artikel Ditemukan
              </h2>
            </div>
          )}
          {showFeatured && (
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">
                Semua Artikel
              </h2>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-semibold">Artikel tidak ditemukan.</p>
              <p className="text-sm mt-1">Coba kata kunci lain.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                >
                  <Link href={`/artikel/${article.slug}`}>
                    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300 p-6 h-full flex flex-col cursor-pointer">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${article.badgeColor}`}
                        >
                          {article.badge}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-gray-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-700">
                            {article.author}
                          </p>
                          <p className="text-xs text-gray-400">{article.date}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {article.tags.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 p-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl border border-orange-100 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/40 rounded-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex p-3 rounded-2xl bg-white shadow-sm border border-orange-100 text-orange-500 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
              Dapatkan Wawasan Terbaru
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
              Ikuti program GESAMEGA dan jadilah bagian dari gerakan ekosistem
              digital pendidikan yang sehat.
            </p>
            <Link
              href="/survei"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl transition-colors shadow-lg shadow-orange-500/20"
            >
              Daftarkan Sekolah Anda <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
