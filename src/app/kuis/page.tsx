"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { SchoolAutocomplete } from "@/components/SchoolAutocomplete";
import {
  Lightbulb,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Zap,
  CheckCircle2,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TourGuide } from "@/components/TourGuide";
import { DriveStep } from "driver.js";

const KUIS_TOUR_STEPS: DriveStep[] = [
  {
    element: "#registration-card",
    popover: {
      title: "Selamat Datang!",
      description: "Silakan isi data diri Anda sebelum memulai kuis refleksi digital ini.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#input-name",
    popover: {
      title: "Nama Pengisi",
      description: "Masukkan nama lengkap Anda agar hasil refleksi lebih personal.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#input-school",
    popover: {
      title: "Asal Sekolah",
      description: "Jangan lupa isi nama sekolah Anda untuk pendataan ekosistem digital.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#btn-start-quiz",
    popover: {
      title: "Mulai Kuis",
      description: "Tombol ini akan aktif setelah Anda mengisi nama dan sekolah.",
      side: "top",
      align: "center",
    },
  },
  {
    element: "#quiz-progress",
    popover: {
      title: "Progres Kuis",
      description: "Lihat sudah sejauh mana Anda menjawab 5 pertanyaan refleksi.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#quiz-question-card",
    popover: {
      title: "Pertanyaan Refleksi",
      description: "Pilih jawaban yang paling jujur untuk mendapatkan hasil yang akurat.",
      side: "top",
      align: "center",
    },
  },
];

const QUESTIONS = [
  {
    id: 1,
    text: "Saat ada notifikasi masuk saat belajar/bekerja, apa yang Anda lakukan?",
    options: [
      { text: "Langsung buka seketika, apapun itu.", score: 0 },
      {
        text: "Cek sekilas, kalau penting dibalas, kalau tidak nanti.",
        score: 1,
      },
      { text: "Abaikan sampai jam istirahat.", score: 2 },
    ],
  },
  {
    id: 2,
    text: "Hal terakhir yang Anda lakukan sebelum tidur?",
    options: [
      { text: "Scroll medsos/nonton video sampai tertidur.", score: 0 },
      { text: "Main HP sebentar lalu dicas jauh dari kasur.", score: 1 },
      {
        text: "Membaca buku atau ngobrol, tidak pakai HP sama sekali.",
        score: 2,
      },
    ],
  },
  {
    id: 3,
    text: "Pernahkah Anda merasa cemas saat HP Anda tertinggal di rumah?",
    options: [
      { text: "Sangat cemas, seperti kehilangan organ tubuh.", score: 0 },
      {
        text: "Sedikit cemas jika ada yang penting, tapi masih bisa ditolerir.",
        score: 1,
      },
      { text: "Biasa saja, sekalian detox layar.", score: 2 },
    ],
  },
  {
    id: 4,
    text: "Berapa jam Anda menghabiskan waktu di aplikasi non-produktif sehari?",
    options: [
      { text: "Lebih dari 5 jam.", score: 0 },
      { text: "Sekitar 2 - 4 jam.", score: 1 },
      { text: "Kurang dari 2 jam.", score: 2 },
    ],
  },
  {
    id: 5,
    text: "Pernahkah Anda menunda tugas penting hanya untuk bermain game/medsos?",
    options: [
      { text: "Sering sekali, ini masalah besar saya.", score: 0 },
      { text: "Kadang-kadang, tapi akhirnya tugas selesai juga.", score: 1 },
      { text: "Hampir tidak pernah, prioritas tetap dijaga.", score: 2 },
    ],
  },
];

const RESULT_CONFIG = {
  addicted: {
    category: "Fase Waspada",
    badge: "Addicted",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    badgeBg: "bg-red-50 text-red-600 border-red-200",
    accentColor: "from-red-400 to-rose-500",
    barColor: "bg-red-400",
    advice:
      "Anda sering kehilangan kontrol atas waktu screen-time. Mulailah berlatih dengan mode 'Do Not Disturb' atau batasi aplikasi hiburan dengan timer di HP Anda.",
    tips: [
      "Aktifkan mode 'Do Not Disturb' saat belajar",
      "Gunakan fitur Screen Time / Digital Wellbeing",
      "Letakkan HP di ruangan lain saat fokus",
    ],
  },
  moderate: {
    category: "Sadar Namun Tergoda",
    badge: "Developing",
    icon: Zap,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    accentColor: "from-amber-400 to-orange-500",
    barColor: "bg-amber-400",
    advice:
      "Secara umum Anda tahu porsinya, namun masih sering goyah. Cobalah untuk menjauhkan HP saat jam belajar agar fokus tidak mudah buyar.",
    tips: [
      "Coba teknik Pomodoro (25 mnt fokus, 5 mnt istirahat)",
      "Masukkan HP ke laci saat mengerjakan tugas",
      "Buat jadwal 'waktu bebas gadget' setiap hari",
    ],
  },
  disciplined: {
    category: "Disiplin & Terkendali",
    badge: "Champion",
    icon: ShieldCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentColor: "from-emerald-400 to-teal-500",
    barColor: "bg-emerald-400",
    advice:
      "Luar biasa! Anda memiliki kontrol kuat terhadap dorongan digital. Pertahankan kebiasaan ini dan jadilah contoh bagi teman-teman di sekitar.",
    tips: [
      "Bagikan tips digital mindfulness ke teman Anda",
      "Tetap pertahankan kebiasaan positif ini",
      "Daftarkan sekolah Anda dalam program ekosistem digital",
    ],
  },
};

export default function KuisPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{
    category: string;
    advice: string;
    totalScore: number;
    configKey: keyof typeof RESULT_CONFIG;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [userName, setUserName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [schoolError, setSchoolError] = useState("");

  const handleStartQuiz = () => {
    if (!schoolId) {
      setSchoolError("Pilih sekolah dari daftar yang tersedia.");
      return;
    }
    setSchoolError("");
    setIsStarted(true);
  };

  const handleAnswer = (score: number, idx: number) => {
    setSelectedIdx(idx);
    setTimeout(() => {
      const newAnswers = [...answers, score];
      setSelectedIdx(null);
      if (newAnswers.length < QUESTIONS.length) {
        setAnswers(newAnswers);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishQuiz(newAnswers);
      }
    }, 380);
  };

  const finishQuiz = async (finalAnswers: number[]) => {
    setAnswers(finalAnswers);
    setLoading(true);

    const totalScore = finalAnswers.reduce((a, b) => a + b, 0);

    let configKey: keyof typeof RESULT_CONFIG;
    if (totalScore <= 3) {
      configKey = "addicted";
    } else if (totalScore <= 7) {
      configKey = "moderate";
    } else {
      configKey = "disciplined";
    }

    const config = RESULT_CONFIG[configKey];

    setResult({
      category: config.category,
      advice: config.advice,
      totalScore,
      configKey,
    });

    try {
      await supabase.from("quiz_results").insert({
        user_name: userName,
        school_id: schoolId || null,
        answers: finalAnswers,
        result_category: config.category,
      });
    } catch (e) {
      console.warn("Could not save to DB, but showing local result", e);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setSelectedIdx(null);
    setIsStarted(false);
    setSchoolName("");
    setSchoolId(null);
    setSchoolError("");
  };

  const progress = (currentQuestion / QUESTIONS.length) * 100;
  const slideVariants = {
    initial: { x: 40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  return (
    <div className="min-h-[90vh] bg-[#FAFAFA] flex flex-col items-center pt-28 pb-16 px-4 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-orange-500 mb-5">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Refleksi Digital Diri
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Kenali seberapa besar pengaruh smartphone terhadap diri Anda dalam 5
            pertanyaan cepat.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* === LOADING STATE === */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-50 flex items-center justify-center">
                <Flame className="w-8 h-8 text-orange-400 animate-pulse" />
              </div>
              <p className="text-lg font-semibold text-gray-600 animate-pulse">
                Menganalisis profil digital Anda...
              </p>
            </motion.div>
          )}

          {/* === RESULT STATE === */}
          {!loading &&
            result &&
            (() => {
              const cfg = RESULT_CONFIG[result.configKey];
              const ResultIcon = cfg.icon;
              const scorePercent = Math.round((result.totalScore / 10) * 100);

              return (
                <motion.div
                  key="result"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-5"
                >
                  {/* Result Card */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Gradient top strip */}
                    <div
                      className={`h-2 w-full bg-gradient-to-r ${cfg.accentColor}`}
                    />

                    <div className="p-8 text-center">
                      {/* Icon */}
                      <div
                        className={`w-20 h-20 ${cfg.iconBg} rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-gray-50`}
                      >
                        <ResultIcon className={`w-10 h-10 ${cfg.iconColor}`} />
                      </div>

                      {/* Badge */}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border mb-4 ${cfg.badgeBg}`}
                      >
                        {cfg.badge}
                      </span>

                      <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        {result.category}
                      </h2>

                      <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-8">
                        &quot;{result.advice}&quot;
                      </p>

                      {/* Score Meter */}
                      <div className="max-w-xs mx-auto mb-6">
                        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                          <span>Addicted</span>
                          <span>Skor: {result.totalScore}/10</span>
                          <span>Champion</span>
                        </div>
                        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${cfg.accentColor}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${scorePercent}%` }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut",
                              delay: 0.3,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tips Card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-orange-500" />
                      Langkah Aksi
                    </h3>
                    <ul className="space-y-3">
                      {cfg.tips.map((tip, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-500 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Ulangi Refleksi
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/survei")}
                      variant="primary"
                      className="w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      Evaluasi Sekolah Anda <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })()}

          {/* === REGISTRATION STATE === */}
          {!loading && !result && !isStarted && (
            <motion.div
              key="registration"
              id="registration-card"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
            >
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Siapa Anda hari ini?
                </h2>
                <p className="text-gray-500">
                  Isi data singkat berikut untuk memulai kuis refleksi.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Nama Pengisi
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="input-name"
                      type="text"
                      placeholder="Masukkan nama lengkap..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-50 outline-none transition-all font-medium text-gray-900"
                    />
                  </div>
                </div>

                <div id="input-school">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Asal Sekolah
                  </label>
                  <SchoolAutocomplete
                    value={schoolName}
                    onChange={(val, school) => {
                      setSchoolName(val);
                      setSchoolId(school?.id ?? null);
                      if (school) setSchoolError("");
                    }}
                    hasError={!!schoolError}
                  />
                  {schoolError && (
                    <p className="text-red-500 text-sm mt-2 ml-1 font-medium">{schoolError}</p>
                  )}
                </div>

                <Button
                  id="btn-start-quiz"
                  onClick={handleStartQuiz}
                  disabled={!userName || !schoolId}
                  variant="primary"
                  className="w-full py-4 rounded-2xl shadow-lg shadow-orange-500/20 text-lg flex items-center justify-center gap-2"
                >
                  Mulai Kuis <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* === QUIZ STATE === */}
          {!loading && !result && isStarted && (
            <motion.div
              key={`question-${currentQuestion}`}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Progress Bar */}
              <div className="mb-8" id="quiz-progress">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Pertanyaan {currentQuestion + 1} dari {QUESTIONS.length}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-orange-500 rounded-full"
                    initial={{
                      width: `${((currentQuestion - 1) / QUESTIONS.length) * 100}%`,
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8" id="quiz-question-card">
                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 leading-snug">
                    {QUESTIONS[currentQuestion].text}
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {QUESTIONS[currentQuestion].options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswer(opt.score, idx)}
                      disabled={selectedIdx !== null}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex justify-between items-center group cursor-pointer
                        ${
                          selectedIdx === idx
                            ? "border-orange-500 bg-orange-50 ring-4 ring-orange-500/10 scale-[1.02]"
                            : "border-gray-100 bg-gray-50/50 hover:border-orange-200 hover:bg-orange-50/40"
                        }
                        ${selectedIdx !== null && selectedIdx !== idx ? "opacity-50" : ""}
                      `}
                    >
                      <span
                        className={`font-semibold text-base transition-colors ${
                          selectedIdx === idx
                            ? "text-orange-700"
                            : "text-gray-700 group-hover:text-orange-900"
                        }`}
                      >
                        {opt.text}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all ${
                          selectedIdx === idx
                            ? "bg-orange-500 text-white scale-100 opacity-100"
                            : "bg-gray-200 text-transparent scale-75 opacity-0 group-hover:scale-90 group-hover:opacity-50"
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i < currentQuestion
                        ? "w-2 h-2 bg-orange-500"
                        : i === currentQuestion
                          ? "w-5 h-2 bg-orange-400"
                          : "w-2 h-2 bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <TourGuide steps={KUIS_TOUR_STEPS} pageName="Kuis Refleksi" />
    </div>
  );
}
