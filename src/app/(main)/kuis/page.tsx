"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TourGuide } from "@/components/TourGuide";
import { DriveStep } from "driver.js";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const KUIS_TOUR_STEPS: DriveStep[] = [
  {
    element: "#registration-card",
    popover: {
      title: "Selamat Datang!",
      description:
        "Silakan isi data diri Anda sebelum memulai kuis refleksi digital ini.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#input-name",
    popover: {
      title: "Nama Pengisi",
      description:
        "Masukkan nama lengkap Anda agar hasil refleksi lebih personal.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#input-school",
    popover: {
      title: "Asal Sekolah",
      description:
        "Jangan lupa isi nama sekolah Anda untuk pendataan ekosistem digital.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#btn-start-quiz",
    popover: {
      title: "Mulai Kuis",
      description:
        "Tombol ini akan aktif setelah Anda mengisi nama dan sekolah.",
      side: "top",
      align: "center",
    },
  },
  {
    element: "#quiz-progress",
    popover: {
      title: "Progres Kuis",
      description: "Lihat sudah sejauh mana Anda menjawab pertanyaan refleksi.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#quiz-question-card",
    popover: {
      title: "Pertanyaan Refleksi",
      description:
        "Pilih jawaban yang paling jujur untuk mendapatkan hasil yang akurat.",
      side: "top",
      align: "center",
    },
  },
];

const COLOR_CONFIG: Record<string, any> = {
  emerald: {
    icon: ShieldCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentColor: "from-emerald-400 to-teal-500",
    barColor: "bg-emerald-400",
  },
  teal: {
    icon: ShieldCheck,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-500",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
    accentColor: "from-teal-400 to-emerald-500",
    barColor: "bg-teal-400",
  },
  amber: {
    icon: Zap,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    accentColor: "from-amber-400 to-orange-500",
    barColor: "bg-amber-400",
  },
  orange: {
    icon: Zap,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    badgeBg: "bg-orange-50 text-orange-700 border-orange-200",
    accentColor: "from-orange-400 to-red-500",
    barColor: "bg-orange-400",
  },
  red: {
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    badgeBg: "bg-red-50 text-red-600 border-red-200",
    accentColor: "from-red-400 to-rose-500",
    barColor: "bg-red-400",
  },
};

function KuisForm() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || undefined;

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const [userName, setUserName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [schoolError, setSchoolError] = useState("");
  const [hasCompleted, setHasCompleted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    // Jika ada ?source= (dari QR Code), selalu izinkan isi ulang
    const hasSource = !!searchParams.get("source");
    if (
      !hasSource &&
      typeof window !== "undefined" &&
      localStorage.getItem("kuis_completed") === "true"
    ) {
      setHasCompleted(true);
    }
    async function loadQuestions() {
      try {
        const res = await fetch("/api/questions?category=Kuis%20Siswa");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const json = await res.json();
        if (json.success && json.data?.length > 0) {
          setQuestions(json.data);
        } else {
          setLoadError("Pertanyaan kuis tidak ditemukan. Hubungi admin.");
        }
      } catch (err: any) {
        console.error("Failed to load questions", err);
        setLoadError("Gagal memuat pertanyaan. Periksa koneksi internet Anda.");
      } finally {
        setLoadingQuestions(false);
      }
    }
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartQuiz = () => {
    if (!schoolId) {
      setSchoolError("Pilih sekolah dari daftar yang tersedia.");
      return;
    }
    setSchoolError("");
    setIsStarted(true);
  };

  const handleAnswer = (
    questionId: number,
    optionId: number,
    score: number,
    idx: number,
  ) => {
    setSelectedIdx(idx);
    setTimeout(() => {
      const newAnswers = [
        ...answers,
        { question_id: questionId, option_id: optionId, score },
      ];
      setSelectedIdx(null);
      if (newAnswers.length < questions.length) {
        setAnswers(newAnswers);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishQuiz(newAnswers);
      }
    }, 380);
  };

  const finishQuiz = async (finalAnswers: any[]) => {
    setAnswers(finalAnswers);
    setLoading(true);
    setSubmitError(null);

    // Tunggu reCAPTCHA siap — retry hingga 3x dengan jeda 500ms
    let captchaToken = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if (executeRecaptcha) {
          captchaToken = await executeRecaptcha("kuis_submit");
          if (captchaToken) break; // berhasil, keluar loop
        } else {
          // Tunggu reCAPTCHA provider inisialisasi
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch {
        console.warn(`reCAPTCHA attempt ${attempt + 1} failed`);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    try {
      const res = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: userName,
          school_id: schoolId,
          answers: finalAnswers,
          source: source,
          captchaToken,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setResult(json.data);
        if (typeof window !== "undefined") {
          localStorage.setItem("kuis_completed", "true");
        }
      } else {
        console.error("Submission failed", json.error);
        setSubmitError(
          json.error === "Token reCAPTCHA tidak ditemukan."
            ? "Verifikasi keamanan gagal. Pastikan koneksi internet Anda stabil dan coba lagi."
            : json.error || "Gagal menyimpan hasil. Silakan coba lagi.",
        );
        setLoading(false);
      }
    } catch (e) {
      console.error("Could not save to API", e);
      setSubmitError(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      );
      setLoading(false);
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

  const progress =
    questions.length > 0 ? (currentQuestion / questions.length) * 100 : 0;
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
            Kenali seberapa besar pengaruh smartphone terhadap diri Anda secara
            personal.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* === LOADING INITIAL STATE === */}
          {loadingQuestions && (
            <motion.div
              key="loading-init"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center flex flex-col items-center justify-center"
            >
              <Loader2 className="w-10 h-10 text-orange-400 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">
                Memuat pertanyaan kuis...
              </p>
            </motion.div>
          )}

          {/* === ERROR STATE === */}
          {!loadingQuestions && loadError && (
            <motion.div
              key="load-error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 text-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Gagal Memuat Kuis
              </h2>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">{loadError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors"
              >
                Coba Lagi
              </button>
            </motion.div>
          )}

          {/* === SUBMITTING / ERROR STATE === */}
          {!loadingQuestions && (loading || submitError) && !result && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center"
            >
              {submitError ? (
                // Error state — tampilkan pesan dan tombol retry
                <>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Gagal Menyimpan Hasil
                  </h2>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
                    {submitError}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitError(null);
                      finishQuiz(answers);
                    }}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors"
                  >
                    Coba Lagi
                  </button>
                </>
              ) : (
                // Loading / submitting state
                <>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-50 flex items-center justify-center">
                    <Flame className="w-8 h-8 text-orange-400 animate-pulse" />
                  </div>
                  <p className="text-lg font-semibold text-gray-600 animate-pulse">
                    Menganalisis profil digital Anda...
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Memverifikasi keamanan...
                  </p>
                </>
              )}
            </motion.div>
          )}

          {/* === RESULT STATE === */}
          {!loadingQuestions &&
            !loading &&
            result &&
            (() => {
              const cfg =
                COLOR_CONFIG[result.indicator_color] || COLOR_CONFIG.emerald;
              const ResultIcon = cfg.icon;

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
                        Skor: {result.totalScore} / {questions.length * 3}
                      </span>

                      <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        {result.category}
                      </h2>

                      <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-4">
                        &quot;{result.description}&quot;
                      </p>

                      {result.motivation_message && (
                        <p className="text-orange-600 font-bold max-w-md mx-auto leading-relaxed mb-8 bg-orange-50 py-2 px-4 rounded-xl inline-block">
                          {result.motivation_message}
                        </p>
                      )}

                      {/* Score Meter */}
                      <div className="max-w-xs mx-auto mb-6">
                        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                          <span>Darurat</span>
                          <span>Bijak</span>
                        </div>
                        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${cfg.accentColor}`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(result.totalScore / (questions.length * 3)) * 100}%`,
                            }}
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
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-500 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </span>
                        Terapkan prinsip mindfulness setiap kali memegang
                        perangkat digital.
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-500 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </span>
                        Beri batasan waktu (screen-time limit) pada aplikasi
                        non-produktif.
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-500 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          3
                        </span>
                        Diskusikan hasil ini dengan teman atau guru di sekolah
                        Anda.
                      </li>
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => (window.location.href = "/")}
                      variant="outline"
                      className="w-full sm:w-auto px-8 py-3"
                    >
                      Kembali ke Beranda
                    </Button>
                  </div>
                </motion.div>
              );
            })()}

          {/* === ALREADY COMPLETED STATE === */}
          {!loadingQuestions &&
            !loadError &&
            !loading &&
            !result &&
            hasCompleted && (
              <motion.div
                key="completed"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                  Anda Sudah Mengisi Kuis
                </h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  Setiap perangkat hanya diperkenankan mengisi kuis satu kali
                  untuk menjaga integritas data riset nasional.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => (window.location.href = "/")}
                    variant="primary"
                    className="px-8 py-3"
                  >
                    Kembali ke Beranda
                  </Button>
                  <Button
                    onClick={() => {
                      localStorage.removeItem("kuis_completed");
                      setHasCompleted(false);
                    }}
                    variant="outline"
                    className="px-8 py-3"
                  >
                    Isi Ulang Kuis
                  </Button>
                </div>
              </motion.div>
            )}

          {/* === REGISTRATION STATE === */}
          {!loadingQuestions &&
            !loadError &&
            !loading &&
            !result &&
            !isStarted &&
            !hasCompleted && (
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
                      <p className="text-red-500 text-sm mt-2 ml-1 font-medium">
                        {schoolError}
                      </p>
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
          {!loadingQuestions &&
            !loadError &&
            !loading &&
            !result &&
            isStarted &&
            questions.length > 0 && (
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
                      Pertanyaan {currentQuestion + 1} dari {questions.length}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-orange-500 rounded-full"
                      initial={{
                        width: `${((currentQuestion - 1) / questions.length) * 100}%`,
                      }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <div
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
                  id="quiz-question-card"
                >
                  {/* Question */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 leading-snug">
                      {questions[currentQuestion].question_text}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {questions[currentQuestion].question_options.map(
                      (opt: any, idx: number) => (
                        <motion.button
                          key={opt.id}
                          onClick={() =>
                            handleAnswer(
                              questions[currentQuestion].id,
                              opt.id,
                              opt.score,
                              idx,
                            )
                          }
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
                            {opt.option_text}
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
                      ),
                    )}
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {questions.map((_, i) => (
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

export default function KuisPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      language="id"
    >
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
          </div>
        }
      >
        <KuisForm />
      </Suspense>
    </GoogleReCaptchaProvider>
  );
}
