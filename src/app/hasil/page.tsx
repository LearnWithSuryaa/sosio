"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SchoolAutocomplete } from "@/components/SchoolAutocomplete";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  School,
  User,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  BarChart3,
  Brain,
  Zap,
  ShieldCheck,
  ArrowRight,
  LogOut,
  TrendingUp,
  Users,
  FileText,
  Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SchoolData {
  id: string;
  nama_sekolah: string;
  wilayah: string | null;
  status: "belum" | "survei" | "komitmen";
  status_validasi: "pending" | "valid" | "flagged";
  pengirim_nama: string | null;
  submit_timestamp: string | null;
  created_at: string;
}

interface SurveyResult {
  id: string;
  nama: string | null;
  jawaban: { q1: string; q2: string; q3: string };
  created_at: string;
}

interface QuizResult {
  id: string;
  user_name: string | null;
  answers: number[];
  result_category: string;
  created_at: string;
}

const SESSION_KEY = "hasil_session";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcDigitalScore(jawaban: { q1: string; q2: string; q3: string }): number {
  let score = 0;
  if (jawaban.q1 === "< 1 jam") score += 33;
  else if (jawaban.q1 === "1 - 3 jam") score += 17;

  if (jawaban.q2 === "Ya, sangat ketat") score += 34;
  else if (jawaban.q2 === "Ada, tapi tidak tegas") score += 17;

  if (jawaban.q3 === "Sangat Membantu") score += 33;
  else if (jawaban.q3 === "Biasa Saja") score += 16;
  return score;
}

function getScoreLabel(score: number): { label: string; color: string; bg: string } {
  if (score >= 70) return { label: "Ekosistem Siap", color: "text-emerald-600", bg: "bg-emerald-500" };
  if (score >= 40) return { label: "Berkembang", color: "text-amber-600", bg: "bg-amber-400" };
  return { label: "Perlu Perhatian", color: "text-red-600", bg: "bg-red-400" };
}

function getStatusBadge(status: SchoolData["status"]) {
  if (status === "komitmen") return { label: "Berkomitmen", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  if (status === "survei") return { label: "Survei Terkirim", cls: "bg-orange-50 text-orange-700 border-orange-200" };
  return { label: "Belum Berpartisipasi", cls: "bg-gray-50 text-gray-600 border-gray-200" };
}

function getValidasiBadge(v: SchoolData["status_validasi"]) {
  if (v === "valid") return { label: "Terverifikasi", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" };
  if (v === "flagged") return { label: "Ditandai", cls: "bg-red-50 text-red-600 border-red-200" };
  return { label: "Menunggu Validasi", cls: "bg-amber-50 text-amber-600 border-amber-200" };
}

function getCategoryColor(cat: string): string {
  if (cat.includes("Disiplin") || cat.includes("Champion")) return "bg-emerald-500";
  if (cat.includes("Sadar") || cat.includes("Developing")) return "bg-amber-400";
  return "bg-red-400";
}

function formatDate(ts: string | null): string {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function getRecommendations(s: SurveyResult | null): string[] {
  if (!s) return [];
  const recs: string[] = [];
  const j = s.jawaban;
  if (j.q1 === "> 3 jam") recs.push("Terapkan kebijakan 'Gadget-Free Zone' di ruang kelas");
  if (j.q2 === "Tidak ada") recs.push("Susun aturan tertulis penggunaan HP segera");
  else if (j.q2 === "Ada, tapi tidak tegas") recs.push("Perkuat penegakan aturan HP yang sudah ada");
  if (j.q3 === "Mengganggu") recs.push("Lakukan sosialisasi dampak digital ke seluruh siswa");
  if (recs.length === 0) recs.push("Pertahankan ekosistem digital positif yang sudah ada");
  recs.push("Daftarkan sekolah dalam program Komitmen Digital Nasional");
  return recs;
}

// ─── Login Gate ───────────────────────────────────────────────────────────────

function LoginGate({ onLogin }: { onLogin: (school: SchoolData) => void }) {
  const [schoolName, setSchoolName] = useState("");
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [pengirim, setPengirim] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(false);

  const handleSubmit = async () => {
    if (!schoolId || !pengirim.trim()) {
      setError("Harap isi nama sekolah dan nama pengirim.");
      return;
    }
    setLoading(true);
    setError("");

    const { data, error: qErr } = await supabase
      .from("schools")
      .select("*")
      .eq("id", schoolId)
      .ilike("pengirim_nama", pengirim.trim())
      .maybeSingle();

    setLoading(false);

    if (qErr || !data) {
      setError("Kredensial tidak ditemukan. Pastikan nama sekolah dan nama pengirim sesuai dengan data yang dikirimkan.");
      setBlocked(true);
      setTimeout(() => setBlocked(false), 4000);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    onLogin(data as SchoolData);
  };

  return (
    <div className="min-h-[90vh] bg-[#FAFAFA] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-white shadow-sm border border-gray-100 text-orange-500 mb-5">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Akses Laporan Sekolah
          </h1>
          <p className="text-gray-500 text-sm">
            Masukkan identitas Anda untuk melihat hasil analitik sekolah Anda.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
          {/* School */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <School className="w-4 h-4 text-orange-500" /> Nama Sekolah
            </label>
            <SchoolAutocomplete
              value={schoolName}
              onChange={(val, school) => {
                setSchoolName(val);
                setSchoolId(school?.id ?? null);
                setError("");
              }}
              hasError={false}
            />
          </div>

          {/* Pengirim */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-orange-500" /> Nama Pengirim Survei
            </label>
            <input
              type="text"
              value={pengirim}
              onChange={(e) => { setPengirim(e.target.value); setError(""); }}
              placeholder="Nama yang diisi saat survei dikirim"
              className="input-field"
              onKeyDown={(e) => e.key === "Enter" && !blocked && handleSubmit()}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading || blocked || !schoolId || !pengirim.trim()}
            className="w-full py-3.5 text-base flex items-center justify-center gap-2"
          >
            {loading ? "Memverifikasi..." : (<>Lihat Laporan Saya <ArrowRight className="w-4 h-4" /></>)}
          </Button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Akses ini hanya untuk perwakilan sekolah yang telah mengirimkan survei.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ school, onLogout }: { school: SchoolData; onLogout: () => void }) {
  const [surveys, setSurveys] = useState<SurveyResult[]>([]);
  const [quizzes, setQuizzes] = useState<QuizResult[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Case study form state
  const [csJudul, setCsJudul] = useState("");
  const [csPenulis, setCsPenulis] = useState("");
  const [csIsi, setCsIsi] = useState("");
  const [csCategory, setCsCategory] = useState("inovasi");
  const [csImpact, setCsImpact] = useState("");
  const [csBadge, setCsBadge] = useState("");
  const [csLoading, setCsLoading] = useState(false);
  const [csSuccess, setCsSuccess] = useState(false);
  const [csError, setCsError] = useState("");

  const submitCaseStudy = async () => {
    setCsError("");
    if (!csJudul.trim() || !csPenulis.trim() || !csIsi.trim()) {
      setCsError("Judul, Nama Penulis, dan Isi Cerita wajib diisi.");
      return;
    }
    setCsLoading(true);
    const { error } = await supabase.from("case_studies").insert({
      school_id: school.id,
      judul: csJudul.trim(),
      penulis: csPenulis.trim(),
      isi: csIsi.trim(),
      category: csCategory,
      impact: csImpact.trim() || null,
      badge: csBadge.trim() || null
    });
    setCsLoading(false);
    
    if (error) {
      setCsError("Gagal mengirim studi kasus. Pastikan koneksi stabil.");
      console.error(error);
    } else {
      setCsSuccess(true);
      setCsJudul(""); setCsPenulis(""); setCsIsi(""); setCsImpact(""); setCsBadge("");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const [{ data: sv }, { data: qz }] = await Promise.all([
        supabase.from("survey_results").select("*").eq("school_id", school.id).order("created_at", { ascending: false }),
        supabase.from("quiz_results").select("*").eq("school_id", school.id).order("created_at", { ascending: false }),
      ]);
      setSurveys((sv as SurveyResult[]) || []);
      setQuizzes((qz as QuizResult[]) || []);
      setLoadingData(false);
    }
    fetchData();
  }, [school.id]);

  const latestSurvey = surveys[0] ?? null;
  const score = latestSurvey ? calcDigitalScore(latestSurvey.jawaban) : 0;
  const scoreInfo = getScoreLabel(score);
  const statusBadge = getStatusBadge(school.status);
  const validasiBadge = getValidasiBadge(school.status_validasi);
  const recs = getRecommendations(latestSurvey);

  const quizCats = quizzes.reduce<Record<string, number>>((acc, q) => {
    const k = q.result_category;
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const slideIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-[90vh] bg-[#FAFAFA] pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Top bar */}
        <motion.div {...slideIn} transition={{ duration: 0.4 }} className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Laporan Sekolah</p>
            <h1 className="text-2xl font-extrabold text-gray-900">{school.nama_sekolah}</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </motion.div>

        {loadingData ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center animate-pulse">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <p className="text-gray-500 font-semibold">Memuat data analitik...</p>
          </div>
        ) : (
          <>
            {/* Panel 1 — Identitas */}
            <motion.div {...slideIn} transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-5">
                <School className="w-5 h-5 text-orange-500" /> Identitas & Status Sekolah
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Wilayah</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                    {school.wilayah || "—"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pengirim</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-1">
                    <User className="w-4 h-4 text-orange-400 shrink-0" />
                    {school.pengirim_nama || "—"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status Partisipasi</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusBadge.cls}`}>
                    <CheckCircle2 className="w-3 h-3" /> {statusBadge.label}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status Validasi</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${validasiBadge.cls}`}>
                    <ShieldCheck className="w-3 h-3" /> {validasiBadge.label}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 col-span-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Tanggal Survei Dikirim</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-orange-400" />
                    {formatDate(school.submit_timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Panel 2 — Hasil Survei */}
            <motion.div {...slideIn} transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-5">
                <FileText className="w-5 h-5 text-orange-500" /> Hasil Survei
                <span className="ml-auto text-xs text-gray-400 font-normal">{surveys.length} kiriman</span>
              </h2>

              {!latestSurvey ? (
                <div className="text-center py-8 text-gray-400">
                  <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">Belum ada data survei.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Skor */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Skor Kesiapan Digital</p>
                        <p className={`text-2xl font-extrabold ${scoreInfo.color} mt-0.5`}>{score}/100 — {scoreInfo.label}</p>
                      </div>
                      <TrendingUp className={`w-8 h-8 ${scoreInfo.color}`} />
                    </div>
                    <div className="w-full bg-white rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${scoreInfo.bg}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Jawaban */}
                  {[
                    { q: "Q1", label: "Rata-rata penggunaan gadget hiburan", val: latestSurvey.jawaban.q1 },
                    { q: "Q2", label: "Aturan tertulis penggunaan HP", val: latestSurvey.jawaban.q2 },
                    { q: "Q3", label: "Dampak regulasi terhadap fokus belajar", val: latestSurvey.jawaban.q3 },
                  ].map(({ q, label, val }) => (
                    <div key={q} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                      <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center shrink-0">{q}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="font-semibold text-gray-800 text-sm truncate">{val}</p>
                      </div>
                    </div>
                  ))}

                  <p className="text-xs text-gray-400 text-right">Survei terakhir dikirim oleh: {latestSurvey.nama || "Anonim"}</p>
                </div>
              )}
            </motion.div>

            {/* Panel 3 — Data Kuis */}
            <motion.div {...slideIn} transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-5">
                <Brain className="w-5 h-5 text-orange-500" /> Data Kuis Refleksi Digital
                <span className="ml-auto text-xs text-gray-400 font-normal">{quizzes.length} peserta</span>
              </h2>

              {quizzes.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Brain className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">Belum ada peserta kuis dari sekolah ini.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <p className="text-2xl font-extrabold text-gray-900">{quizzes.length}</p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">Total Peserta</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <p className="text-2xl font-extrabold text-emerald-600">
                        {quizzes.filter(q => q.result_category.includes("Disiplin") || q.result_category.includes("Champion")).length}
                      </p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">Champion</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <p className="text-2xl font-extrabold text-red-500">
                        {quizzes.filter(q => q.result_category.includes("Waspada") || q.result_category.includes("Addicted")).length}
                      </p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">Perlu Perhatian</p>
                    </div>
                  </div>

                  {/* Distribusi */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Distribusi Kategori</p>
                    {Object.entries(quizCats).map(([cat, count]) => (
                      <div key={cat} className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${getCategoryColor(cat)}`} />
                        <span className="text-sm text-gray-700 flex-1">{cat}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${getCategoryColor(cat)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(count / quizzes.length) * 100}%` }}
                              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-500 w-4 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Peserta terbaru */}
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Peserta Terbaru</p>
                    <div className="space-y-2">
                      {quizzes.slice(0, 5).map((q) => (
                        <div key={q.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${getCategoryColor(q.result_category)}`} />
                          <span className="text-sm font-medium text-gray-700 flex-1">{q.user_name || "Anonim"}</span>
                          <span className="text-xs text-gray-400">{q.result_category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Panel 4 — Rekomendasi */}
            <motion.div {...slideIn} transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-5">
                <Star className="w-5 h-5 text-orange-500" /> Rekomendasi Aksi
              </h2>
              <ul className="space-y-3 mb-6">
                {recs.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-orange-50/60 rounded-xl border border-orange-100">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-gray-700 font-medium">{rec}</p>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/peta" className="flex-1">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" /> Lihat Peta Partisipasi
                  </Button>
                </a>
                {school.status !== "komitmen" && (
                  <a href="/komitmen" className="flex-1">
                    <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                      Ambil Komitmen <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Panel 5 — Input Studi Kasus */}
            <motion.div {...slideIn} transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-orange-500" /> Bagikan Studi Kasus Anda
              </h2>
              <p className="text-sm text-gray-500 mb-6">Ceritakan praktik baik, regulasi, atau inovasi yang telah sekolah Anda terapkan berdasarkan hasil refleksi ini untuk menginspirasi sekolah lain.</p>
              
              {csSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <h3 className="text-emerald-800 font-bold mb-1">Studi Kasus Berhasil Dikirim!</h3>
                  <p className="text-emerald-600 text-sm mb-4">Terima kasih telah berbagi inspirasi dengan komunitas.</p>
                  <Button variant="outline" onClick={() => setCsSuccess(false)}>Kirim Studi Kasus Lainnya</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Studi Kasus <span className="text-red-500">*</span></label>
                      <input 
                        type="text" value={csJudul} onChange={e => setCsJudul(e.target.value)} 
                        placeholder="Contoh: Sistem Loker HP Terpadu"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Penulis <span className="text-red-500">*</span></label>
                      <input 
                        type="text" value={csPenulis} onChange={e => setCsPenulis(e.target.value)} 
                        placeholder="Contoh: Drs. Hendra Permana"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
                      <select 
                        value={csCategory} onChange={e => setCsCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                      >
                        <option value="inovasi">Inovasi Sekolah</option>
                        <option value="regulasi">Regulasi & Kebijakan</option>
                        <option value="literasi">Literasi Digital</option>
                        <option value="pembelajaran">Metode Pembelajaran</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Dampak (Opsional)</label>
                      <input 
                        type="text" value={csImpact} onChange={e => setCsImpact(e.target.value)} 
                        placeholder="Contoh: +42% Fokus Belajar"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Isi Cerita <span className="text-red-500">*</span></label>
                    <textarea 
                      value={csIsi} onChange={e => setCsIsi(e.target.value)} 
                      placeholder="Ceritakan latar belakang, proses implementasi, dan hasil dari studi kasus ini..."
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  {csError && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{csError}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button 
                      variant="primary" 
                      onClick={submitCaseStudy} 
                      disabled={csLoading}
                      className="w-full py-3"
                    >
                      {csLoading ? "Mengirim..." : "Kirim Studi Kasus"}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function HasilPage() {
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setSchool(JSON.parse(raw) as SchoolData);
    } catch { /* ignore */ }
    setChecked(true);
  }, []);

  const handleLogin = (s: SchoolData) => setSchool(s);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSchool(null);
  };

  if (!checked) return null;

  return (
    <AnimatePresence mode="wait">
      {school ? (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <Dashboard school={school} onLogout={handleLogout} />
        </motion.div>
      ) : (
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <LoginGate onLogin={handleLogin} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
