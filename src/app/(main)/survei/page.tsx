"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { SchoolAutocomplete } from "@/components/SchoolAutocomplete";
import { submitSurvey } from "@/app/actions/survey";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Building2,
  MapPin,
  User,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { TourGuide } from "@/components/TourGuide";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

// ── Animation ────────────────────────────────────────────────────────────────
const customEase = cubicBezier(0.22, 1, 0.36, 1);

const slideForward = {
  initial: { x: 40, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
  transition: { duration: 0.32, ease: customEase },
};

const slideBack = {
  initial: { x: -40, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 40, opacity: 0 },
  transition: { duration: 0.32, ease: customEase },
};

const fadeUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.4, ease: customEase },
};

// ── Shared components ─────────────────────────────────────────────────────────

/** Ambient background — identical to KuisPage for visual consistency */
function Background() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-32 right-0 w-[640px] h-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.09) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

/** Card shell */
function Card({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`rounded-3xl overflow-hidden ${className}`}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

/** Step indicator — 3 steps matching the wizard */
function StepIndicator({ step }: { step: number }) {
  const steps = [
    { label: "Identitas", icon: User },
    { label: "Kuesioner", icon: ClipboardList },
    { label: "Kirim", icon: Sparkles },
  ];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const active = i + 1 === step;
        const done = i + 1 < step;
        return (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300
              ${
                active
                  ? "bg-orange-500 text-white"
                  : done
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-white/5 text-white/20"
              }`}
            >
              {done ? (
                <Check className="w-3 h-3" />
              ) : (
                <Icon className="w-3 h-3" />
              )}
              <span>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight
                className={`w-3 h-3 ${done ? "text-orange-500/50" : "text-white/10"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Styled input field with focus state */
function InputField({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  hint,
  required,
}: {
  id?: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ElementType;
  error?: string;
  hint?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        htmlFor={id || name}
        className="block text-xs font-bold text-white/50 mb-2 ml-1 uppercase tracking-widest"
      >
        {label}{" "}
        {required && <span className="text-orange-400 normal-case">*</span>}
      </label>
      <div className="relative">
        <Icon
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 pointer-events-none
            ${focused ? "text-orange-400" : error ? "text-red-400/60" : "text-white/20"}`}
        />
        <input
          id={id || name}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none transition-all duration-200 font-medium text-sm text-white placeholder:text-white/20"
          style={{
            background: focused
              ? "rgba(249,115,22,0.08)"
              : error
                ? "rgba(239,68,68,0.06)"
                : "rgba(255,255,255,0.05)",
            border: `1px solid ${
              focused
                ? "rgba(249,115,22,0.4)"
                : error
                  ? "rgba(239,68,68,0.3)"
                  : "rgba(255,255,255,0.08)"
            }`,
            boxShadow: focused ? "0 0 0 3px rgba(249,115,22,0.08)" : "none",
          }}
        />
      </div>
      {error ? (
        <p className="flex items-center gap-1.5 text-xs text-red-400 mt-2 ml-1 font-medium">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {error}
        </p>
      ) : hint ? (
        <p className="text-[11px] text-white/25 mt-1.5 ml-1">{hint}</p>
      ) : null}
    </div>
  );
}

/** Answer option tile — dark theme version of TileRadio */
function AnswerOption({
  label,
  selected,
  onSelect,
  disabled,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      whileHover={!disabled ? { x: 4 } : {}}
      whileTap={!disabled ? { scale: 0.985 } : {}}
      className="w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group"
      style={{
        background: selected
          ? "rgba(249,115,22,0.1)"
          : "rgba(255,255,255,0.04)",
        border: selected
          ? "1px solid rgba(249,115,22,0.4)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: selected ? "0 0 0 3px rgba(249,115,22,0.08)" : "none",
      }}
    >
      {/* Radio dot */}
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
          ${
            selected
              ? "border-orange-500 bg-orange-500"
              : "border-white/20 group-hover:border-orange-400/50"
          }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <span
        className={`text-sm leading-snug font-medium transition-colors duration-200
          ${selected ? "text-orange-200" : "text-white/60 group-hover:text-white/80"}`}
      >
        {label}
      </span>
    </motion.button>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────
function SurveiForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  if (!source) notFound();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [form, setForm] = useState({ nama: "", namaSekolah: "", wilayah: "" });
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [jawaban, setJawaban] = useState<Record<number, string>>({});

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("survei_completed") === "true"
    ) {
      setHasCompleted(true);
    }
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/questions");
        const json = await res.json();
        if (json.success) {
          const surveyQs = json.data.filter(
            (q: any) => q.category === "Survei GESAMEGA",
          );
          setQuestions(surveyQs.length > 0 ? surveyQs : json.data);
        }
      } catch (e) {
        console.error("Failed to load survey questions", e);
      } finally {
        setLoadingQuestions(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[e.target.name];
        return n;
      });
  };

  const handleAnswer = (questionId: number, index: number, value: string) => {
    setJawaban((prev) => ({ ...prev, [questionId]: value }));
    if (errors[`q${questionId}`]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[`q${questionId}`];
        delete n["survey_incomplete"];
        return n;
      });
    }
    // Auto-scroll to next question
    if (index < questions.length - 1) {
      setTimeout(() => {
        document
          .getElementById(`field-q${questions[index + 1].id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  };

  const validateStep = (step: number) => {
    const stepErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.nama.trim()) stepErrors.nama = "Nama lengkap wajib diisi.";
      if (!form.namaSekolah)
        stepErrors.namaSekolah = "Nama instansi wajib diisi.";
      if (!form.wilayah.trim()) stepErrors.wilayah = "Wilayah wajib diisi.";
    } else if (step === 2) {
      const answeredCount = Object.keys(jawaban).length;
      if (answeredCount < questions.length) {
        stepErrors.survey_incomplete = `Anda baru menjawab ${answeredCount} dari ${questions.length} pertanyaan.`;
        questions.forEach((q) => {
          if (!jawaban[q.id]) stepErrors[`q${q.id}`] = "Wajib dipilih";
        });
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const goToNextStep = () => {
    if (!validateStep(currentStep)) {
      if (currentStep === 2) {
        const firstKey = Object.keys(errors).find((k) => k.startsWith("q"));
        if (firstKey)
          document
            .getElementById(`field-${firstKey}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setDirection("forward");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep((p) => Math.min(p + 1, totalSteps));
  };

  const goToPrevStep = () => {
    setDirection("back");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep((p) => Math.max(p - 1, 1));
  };

  const handleSubmit = async () => {
    setErrors({});
    if (!executeRecaptcha) {
      setErrors({ submit: "reCAPTCHA belum siap, mohon tunggu sebentar." });
      return;
    }
    setLoading(true);
    let captchaToken = "";
    try {
      captchaToken = await executeRecaptcha("survei_submit");
    } catch (err: any) {
      setErrors({
        submit: `Gagal verifikasi keamanan: ${err?.message || "Unknown error"}.`,
      });
      setLoading(false);
      return;
    }
    try {
      const result = await submitSurvey({
        ...form,
        jawaban,
        captchaToken,
        source: source || undefined,
      });
      if (!result.success) {
        setErrors({ submit: result.error || "Terjadi kesalahan." });
        setLoading(false);
        return;
      }
      if (typeof window !== "undefined")
        localStorage.setItem("survei_completed", "true");
      setSuccess(true);
      setTimeout(
        () => router.push(`/peta?schoolId=${result.schoolId}&from=survei`),
        3500,
      );
    } catch {
      setErrors({
        submit: "Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.",
      });
      setLoading(false);
    }
  };

  const slideVariant = direction === "forward" ? slideForward : slideBack;
  const answeredCount = Object.keys(jawaban).length;

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-[#070707] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <Background />
        <motion.div {...fadeUp} className="relative z-10 text-center">
          {/* Pulsing ring */}
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: "rgba(16,185,129,0.15)",
                animationDuration: "1.5s",
              }}
            />
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center relative"
              style={{
                background: "rgba(16,185,129,0.15)",
                boxShadow: "0 0 40px rgba(16,185,129,0.2)",
              }}
            >
              <CheckCircle2 className="w-14 h-14 text-emerald-400" />
            </div>
          </div>
          <h2
            className="text-4xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Berhasil Dikirim!
          </h2>
          <p className="text-white/45 max-w-sm mx-auto text-sm leading-relaxed mb-3">
            Tanggapan Anda telah tersimpan di pangkalan data nasional.
          </p>
          <div className="flex items-center justify-center gap-2 text-emerald-400/70">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs font-medium">
              Memuat Peta Partisipasi...
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Already completed ───────────────────────────────────────────────────────
  if (hasCompleted) {
    return (
      <div className="min-h-screen bg-[#070707] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <Background />
        <motion.div {...fadeUp} className="w-full max-w-md relative z-10">
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-orange-400" />
            </div>
            <h2
              className="text-2xl font-black text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Sudah Mengisi
            </h2>
            <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed mb-8">
              Perangkat ini telah mengirimkan tanggapan. Terima kasih atas
              partisipasi Anda dalam memajukan ekosistem digital nasional.
            </p>
            <button
              onClick={() => router.push("/")}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-2xl transition-colors text-sm"
            >
              Kembali ke Beranda
            </button>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ── Main wizard ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#070707] flex flex-col items-center pt-24 pb-20 px-4 relative overflow-hidden">
      <Background />

      <div className="w-full max-w-2xl relative z-10">
        {/* Page header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.2)",
            }}
          >
            <Activity className="w-4 h-4 text-orange-400" />
            <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">
              Evaluasi Diagnostik
            </span>
          </div>
          <h1
            className="text-3xl font-black text-white mb-3 tracking-tight leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Pemetaan Ekosistem Digital
          </h1>
          <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed">
            Bantu kami memahami kesiapan digital instansi Anda dalam 3 langkah
            singkat.
          </p>
        </motion.div>

        {/* Step indicator */}
        <StepIndicator step={currentStep} />

        {/* Progress bar */}
        <div
          id="tour-survei-progress"
          className="w-full h-1 rounded-full mb-8 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #ea580c, #f97316)" }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: customEase }}
          />
        </div>

        {/* Submit error banner */}
        <AnimatePresence>
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 flex items-start gap-3 px-5 py-4 rounded-2xl"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-400">Gagal Mengirim</p>
                <p className="text-xs text-red-400/70 mt-0.5">
                  {errors.submit}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard steps */}
        <AnimatePresence mode="wait">
          {/* ── STEP 1: IDENTITAS ── */}
          {currentStep === 1 && (
            <motion.div id="tour-survei-step1" key="step1" {...slideVariant}>
              <Card className="p-8">
                <div className="mb-7">
                  <h2
                    className="text-xl font-black text-white mb-1.5"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Informasi Instansi
                  </h2>
                  <p className="text-white/35 text-sm">
                    Pastikan data instansi Anda terisi dengan benar.
                  </p>
                </div>

                <div className="space-y-5">
                  <InputField
                    label="Nama Lengkap Pengisi"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="cth. Drs. Ahmad Fauzi, M.Pd"
                    icon={User}
                    error={errors.nama}
                    hint="Nama akan tercatat sebagai penanggung jawab pengisian."
                    required
                  />

                  <div>
                    <label className="block text-xs font-bold text-white/50 mb-2 ml-1 uppercase tracking-widest">
                      Nama Instansi / Sekolah{" "}
                      <span className="text-orange-400">*</span>
                    </label>
                    <SchoolAutocomplete
                      value={form.namaSekolah}
                      onChange={(val) => {
                        setForm((prev) => ({ ...prev, namaSekolah: val }));
                        if (errors.namaSekolah)
                          setErrors((prev) => ({ ...prev, namaSekolah: "" }));
                      }}
                      hasError={!!errors.namaSekolah}
                    />
                    {errors.namaSekolah ? (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 mt-2 ml-1 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />{" "}
                        {errors.namaSekolah}
                      </p>
                    ) : (
                      <p className="text-[11px] text-white/25 mt-1.5 ml-1">
                        Pilih dari daftar yang muncul.
                      </p>
                    )}
                  </div>

                  <InputField
                    label="Wilayah / Kota"
                    name="wilayah"
                    value={form.wilayah}
                    onChange={handleChange}
                    placeholder="cth. Kota Malang"
                    icon={MapPin}
                    error={errors.wilayah}
                    hint="Digunakan untuk pemetaan regional."
                    required
                  />
                </div>
              </Card>

              <p className="text-center text-[11px] text-white/20 mt-5 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Data dilindungi dan hanya digunakan untuk keperluan riset
              </p>
            </motion.div>
          )}

          {/* ── STEP 2: KUESIONER ── */}
          {currentStep === 2 && (
            <motion.div id="tour-survei-step2" key="step2" {...slideVariant}>
              {/* Sticky header */}
              <div
                className="sticky top-0 z-20 py-4 mb-6"
                style={{
                  background: "#070707",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2
                      className="text-xl font-black text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Pertanyaan Inti
                    </h2>
                    <p className="text-white/35 text-sm mt-0.5">
                      Pilih jawaban yang paling mewakili kondisi di lapangan.
                    </p>
                  </div>
                  {/* Mini progress counter */}
                  <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full shrink-0 mt-0.5">
                    {answeredCount}/{questions.length} dijawab
                  </span>
                </div>

                {/* Micro segmented bar — answers progress */}
                {questions.length > 0 && (
                  <div className="flex gap-1 mt-3">
                    {questions.map((q, i) => (
                      <div
                        key={q.id}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background: jawaban[q.id]
                            ? "#F97316"
                            : "rgba(255,255,255,0.06)",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Incomplete error */}
                <AnimatePresence>
                  {errors.survey_incomplete && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="flex items-center gap-2.5 mt-3 px-4 py-3 rounded-xl"
                        style={{
                          background: "rgba(239,68,68,0.08)",
                          border: "1px solid rgba(239,68,68,0.2)",
                        }}
                      >
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        <p className="text-xs font-medium text-red-400">
                          {errors.survey_incomplete}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {loadingQuestions ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                  </div>
                  <p className="text-white/40 text-sm font-medium">
                    Memuat pertanyaan survei...
                  </p>
                </div>
              ) : (
                <div className="space-y-10 pb-4">
                  {questions.map((q, index) => (
                    <motion.div
                      key={q.id}
                      id={`field-q${q.id}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={`p-6 transition-all duration-200 ${errors[`q${q.id}`] ? "ring-1 ring-red-500/30" : ""}`}
                      >
                        {/* Question header */}
                        <div className="flex items-start gap-3 mb-5">
                          <span className="w-6 h-6 rounded-full bg-orange-500/15 text-orange-400 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <h3 className="text-base font-black text-white leading-snug">
                            {q.question_text}
                          </h3>
                        </div>

                        <div className="space-y-2.5">
                          {q.question_options.map((opt: any) => (
                            <AnswerOption
                              key={opt.id}
                              label={opt.option_text}
                              selected={jawaban[q.id] === opt.option_text}
                              onSelect={() =>
                                handleAnswer(q.id, index, opt.option_text)
                              }
                            />
                          ))}
                        </div>

                        {errors[`q${q.id}`] && (
                          <p className="flex items-center gap-1.5 text-xs text-red-400 mt-3 font-medium">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            {errors[`q${q.id}`]}
                          </p>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── STEP 3: KIRIM ── */}
          {currentStep === 3 && (
            <motion.div key="step3" {...slideVariant}>
              <Card className="p-8">
                <div className="text-center mb-8">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div
                      className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping"
                      style={{ animationDuration: "2s" }}
                    />
                    <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center relative">
                      <ShieldCheck className="w-9 h-9 text-emerald-400" />
                    </div>
                  </div>
                  <h2
                    className="text-xl font-black text-white mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Siap Dikirim!
                  </h2>
                  <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed">
                    Semua jawaban Anda telah tercatat. Tekan tombol di bawah
                    untuk mengirimkan ke sistem.
                  </p>
                </div>

                {/* Summary recap */}
                <div className="space-y-2.5 mb-6">
                  {[
                    { icon: User, label: "Pengisi", value: form.nama },
                    {
                      icon: Building2,
                      label: "Instansi",
                      value: form.namaSekolah,
                    },
                    { icon: MapPin, label: "Wilayah", value: form.wilayah },
                    {
                      icon: ClipboardList,
                      label: "Pertanyaan dijawab",
                      value: `${answeredCount} dari ${questions.length}`,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Icon className="w-4 h-4 text-white/25 shrink-0" />
                      <span className="text-xs text-white/35 min-w-[100px]">
                        {label}
                      </span>
                      <span className="text-sm font-semibold text-white/70 truncate">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* reCAPTCHA notice */}
                <div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="text-[11px] text-white/30 leading-relaxed">
                    Formulir ini dilindungi oleh{" "}
                    <span className="text-white/50 font-semibold">
                      Google reCAPTCHA v3
                    </span>
                    . Verifikasi berjalan otomatis.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation footer */}
        <div
          className="mt-8 pt-6 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <button
            type="button"
            onClick={goToPrevStep}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold border border-white/[0.07] text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all
              ${currentStep === 1 ? "invisible" : "visible"}`}
          >
            <ChevronLeft className="w-4 h-4" /> Kembali
          </button>

          {currentStep < totalSteps ? (
            <motion.button
              type="button"
              onClick={goToNextStep}
              disabled={loadingQuestions && currentStep === 2}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black text-white disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow: "0 8px 20px rgba(249,115,22,0.25)",
              }}
            >
              Selanjutnya <ChevronRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              whileHover={!loading ? { y: -1 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black text-white disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow: "0 8px 20px rgba(249,115,22,0.25)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Kirim Survei
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Step counter */}
        <p className="text-center text-[11px] text-white/20 mt-5 uppercase tracking-widest font-bold">
          Langkah {currentStep} dari {totalSteps}
        </p>
      </div>

      <TourGuide
        pageName="Survei"
        steps={[
          {
            element: "#tour-survei-progress",
            popover: {
              title: "Lacak Kemajuan",
              description:
                "Survei ini hanya 3 langkah. Garis ini menunjukkan seberapa jauh Anda sudah mengisi.",
            },
          },
          {
            element: "#tour-survei-step1",
            popover: {
              title: "Informasi Instansi",
              description:
                "Isi asal instansi/sekolah Anda agar data dapat dipetakan dengan akurat.",
            },
          },
        ]}
      />
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────
export default function SurveiPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      language="id"
    >
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#070707]">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        }
      >
        <SurveiForm />
      </Suspense>
    </GoogleReCaptchaProvider>
  );
}
