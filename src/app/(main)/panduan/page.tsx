"use client";

import {
  FileText,
  Download,
  Shield,
  BookOpen,
  Users,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Info,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const GUIDES = [
  {
    id: 1,
    category: "template",
    icon: ClipboardList,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    badge: "Template Siap Pakai",
    badgeColor: "bg-orange-50 text-orange-600 border-orange-200",
    title: "Template Tata Tertib Penggunaan HP di Sekolah",
    desc: "Dokumen Word yang dapat langsung disesuaikan dengan kebutuhan sekolah Anda. Mencakup pasal-pasal tentang waktu, lokasi, sanksi, dan prosedur pengaduan.",
    highlights: [
      "Pasal penggunaan di jam belajar",
      "Sanksi bertahap (teguran → penyitaan)",
      "Prosedur pengambilan HP orang tua",
      "Klausul pengecualian (sakit, darurat)",
    ],
    fileLabel: "DOCX · 48 KB",
    downloadHref: "#",
    featured: true,
  },
  {
    id: 2,
    category: "panduan",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    badge: "Panduan Sosialisasi",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
    title: "Panduan Sosialisasi Kebijakan Gadget kepada Orang Tua & Siswa",
    desc: "Langkah-langkah komunikasi yang efektif untuk memperkenalkan kebijakan baru tanpa menimbulkan resistensi dari orang tua maupun siswa.",
    highlights: [
      "Skrip presentasi rapat wali murid",
      "FAQ untuk orang tua yang berkeberatan",
      "Materi kampanye visual untuk papan mading",
      "Checklist persiapan sosialisasi",
    ],
    fileLabel: "PDF · 1.2 MB",
    downloadHref: "#",
    featured: true,
  },
  {
    id: 3,
    category: "template",
    icon: FileText,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    badge: "Surat Edaran",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    title: "Template Surat Edaran Kepala Sekolah tentang Digital Wellbeing",
    desc: "Surat resmi berformat dinas yang dapat langsung ditandatangani dan diedarkan kepada seluruh warga sekolah sebagai landasan hukum kebijakan.",
    highlights: [
      "Format surat dinas standar",
      "Kop surat adaptif",
      "Lampiran ringkasan kebijakan",
      "Kolom tanda tangan pihak terkait",
    ],
    fileLabel: "DOCX · 28 KB",
    downloadHref: "#",
    featured: false,
  },
  {
    id: 4,
    category: "edukasi",
    icon: BookOpen,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    badge: "Modul Kelas",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
    title: "Modul Pembelajaran Literasi Digital untuk Siswa SMP & SMA",
    desc: "Modul 4-pertemuan yang dapat diintegrasikan ke mapel BK atau PPKn, membahas dampak gadget, privasi digital, dan self-regulation.",
    highlights: [
      "4 RPP siap pakai",
      "Lembar kerja siswa (LKS)",
      "Rubrik penilaian sikap",
      "Materi refleksi diri interaktif",
    ],
    fileLabel: "PDF · 3.8 MB",
    downloadHref: "#",
    featured: false,
  },
  {
    id: 5,
    category: "panduan",
    icon: Shield,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    badge: "Panduan Penegakan",
    badgeColor: "bg-red-50 text-red-600 border-red-200",
    title: "SOP Penegakan Kebijakan Gadget: Dari Teguran hingga Pelaporan",
    desc: "Prosedur operasional standar bagi guru dan staf untuk menangani pelanggaran kebijakan gadget secara konsisten, adil, dan terdokumentasi.",
    highlights: [
      "Flowchart penanganan pelanggaran",
      "Form dokumentasi insiden",
      "Mekanisme banding siswa & orang tua",
      "Panduan komunikasi dengan guru BK",
    ],
    fileLabel: "PDF · 0.9 MB",
    downloadHref: "#",
    featured: false,
  },
  {
    id: 6,
    category: "template",
    icon: ClipboardList,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    badge: "Monitoring",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    title: "Lembar Monitoring & Evaluasi Implementasi Kebijakan Gadget",
    desc: "Form evaluasi berkala (bulanan/semesteran) untuk memantau efektivitas kebijakan berdasarkan indikator terukur yang dapat dilaporkan ke dinas.",
    highlights: [
      "Indikator KPI kebijakan digital",
      "Form evaluasi bulanan",
      "Grafik tren otomatis (Excel)",
      "Format laporan ke dinas pendidikan",
    ],
    fileLabel: "XLSX · 65 KB",
    downloadHref: "#",
    featured: false,
  },
];

const FILTER_TABS = [
  { label: "Semua", value: "all" },
  { label: "Template", value: "template" },
  { label: "Panduan", value: "panduan" },
  { label: "Edukasi", value: "edukasi" },
];

const STEPS = [
  {
    num: "01",
    title: "Unduh Dokumen",
    desc: "Pilih dokumen yang sesuai kebutuhan sekolah Anda dan unduh gratis.",
  },
  {
    num: "02",
    title: "Sesuaikan Isi",
    desc: 'Isi bagian yang bertanda "[diisi sekolah]" dengan data dan kebijakan spesifik.',
  },
  {
    num: "03",
    title: "Sosialisasikan",
    desc: "Gunakan panduan sosialisasi kami untuk memperkenalkan kebijakan secara efektif.",
  },
  {
    num: "04",
    title: "Daftarkan Komitmen",
    desc: "Setelah implementasi, daftarkan sekolah di peta komitmen GESAMEGA.",
  },
];

export default function PanduanPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = GUIDES.filter(
    (g) => activeTab === "all" || g.category === activeTab
  );

  return (
    <div className="min-h-[90vh] bg-[#FAFAFA] pt-28 pb-16 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex p-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-orange-500 mb-5">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Panduan Kebijakan
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Dokumen, template, dan modul siap pakai untuk membantu sekolah Anda
            membangun ekosistem digital yang sehat dan terstruktur.
          </p>

          {/* Alert info */}
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full">
            <Info className="w-4 h-4 shrink-0" />
            Semua dokumen tersedia gratis dan dapat disesuaikan
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-14 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-black uppercase tracking-widest text-orange-500">
              Cara Menggunakan
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col"
              >
                <div className="text-4xl font-black text-orange-100 mb-3 leading-none">
                  {step.num}
                </div>
                <h3 className="font-extrabold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.value
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-200 hover:text-orange-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 font-semibold">
            {filtered.length} dokumen
          </span>
        </div>

        {/* Guide Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden ${
                  guide.featured
                    ? "border-orange-100 ring-1 ring-orange-100"
                    : "border-gray-100"
                }`}
              >
                {guide.featured && (
                  <div className="h-1 w-full bg-gradient-to-r from-orange-400 to-rose-400" />
                )}
                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + Badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${guide.iconBg}`}
                    >
                      <Icon className={`w-5 h-5 ${guide.iconColor}`} />
                    </div>
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${guide.badgeColor}`}
                    >
                      {guide.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-gray-900 mb-3 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">
                    {guide.desc}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {guide.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-600"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-semibold">
                      {guide.fileLabel}
                    </span>
                    <a
                      href={guide.downloadHref}
                      className="flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors group"
                    >
                      <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                      Unduh
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Regulasi Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 mb-1">
                Regulasi & Dasar Hukum
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Referensi Permendikbud, Surat Edaran, dan kebijakan resmi sebagai
                landasan legal kebijakan sekolah Anda.
              </p>
              <a
                href="https://www.kemdikbud.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
              >
                Kunjungi Portal Kemendikbud{" "}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* CTA Survei */}
          <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl border border-orange-100 p-7 flex items-start gap-5 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-white/40 rounded-full blur-3xl pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
              <ArrowRight className="w-5 h-5 text-orange-500" />
            </div>
            <div className="relative z-10">
              <h3 className="font-extrabold text-gray-900 mb-1">
                Sudah Siap Berkomitmen?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Setelah mengunduh panduan, daftarkan sekolah Anda dan tampilkan
                komitmen di Peta Partisipasi Nasional.
              </p>
              <Link
                href="/survei"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-orange-500/20"
              >
                Mulai Survei <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
