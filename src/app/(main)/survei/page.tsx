"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TourGuide } from "@/components/TourGuide";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

function TileRadio({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`tile-radio group ${value === opt.value ? "selected" : ""}`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`font-semibold text-lg transition-colors text-left ${
                value === opt.value
                  ? "text-orange-600"
                  : "text-gray-700 group-hover:text-orange-900"
              }`}
            >
              {opt.label}
            </span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                value === opt.value
                  ? "bg-orange-500 text-white scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            >
              <Check className="w-4 h-4" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function SurveiForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [form, setForm] = useState({
    nama: "",
    namaSekolah: "",
    wilayah: "",
  });

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [jawaban, setJawaban] = useState<Record<number, string>>({});

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/questions");
        const json = await res.json();
        if (json.success) {
          // Filter to only get GESAMEGA survey questions if needed, or just use all
          const surveyQs = json.data.filter(
            (q: any) => q.category === "Survei GESAMEGA",
          );
          // If no specific category matches, fallback to all (e.g. if category is slightly different)
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleTileChange =
    (questionId: number, index: number) => (value: string) => {
      setJawaban((prev) => ({ ...prev, [questionId]: value }));

      if (errors[`q${questionId}`]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`q${questionId}`];
          delete newErrors["survey_incomplete"];
          return newErrors;
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
    let valid = true;
    let stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (!form.nama.trim()) {
        stepErrors.nama = "Nama Lengkap wajib diisi untuk akses laporan hasil";
        valid = false;
      }
      if (!form.namaSekolah) {
        stepErrors.namaSekolah = "Nama Sekolah wajib diisi";
        valid = false;
      }
      if (!form.wilayah) {
        stepErrors.wilayah = "Wilayah wajib diisi";
        valid = false;
      }
    } else if (step === 2) {
      // Check if all questions are answered
      const answeredCount = Object.keys(jawaban).length;
      if (answeredCount < questions.length) {
        stepErrors.survey_incomplete = `Anda baru menjawab ${answeredCount} dari ${questions.length} pertanyaan. Silakan lengkapi semua pertanyaan.`;
        valid = false;

        // Find the first unanswered to highlight
        for (const q of questions) {
          if (!jawaban[q.id]) {
            stepErrors[`q${q.id}`] = "Wajib dipilih";
          }
        }
      }
    }

    setErrors(stepErrors);
    return valid;
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentStep((p) => Math.min(p + 1, totalSteps));
    } else if (currentStep === 2) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors).find((k) => k.startsWith("q"));
      if (firstErrorKey) {
        document
          .getElementById(`field-${firstErrorKey}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const goToPrevStep = () => {
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
      console.error("reCAPTCHA Execution Error:", err);
      setErrors({ submit: `Gagal verifikasi keamanan: ${err?.message || "Unknown Error"}. Pastikan koneksi stabil.` });
      setLoading(false);
      return;
    }

    try {
      // Map jawaban to text values to save to DB
      const result = await submitSurvey({
        ...form,
        jawaban: jawaban,
        captchaToken,
      });

      if (!result.success) {
        setErrors({ submit: result.error || "Terjadi kesalahan" });
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/peta?schoolId=${result.schoolId}&from=survei`);
      }, 3500);
    } catch (error) {
      console.error("Error submitting survey:", error);
      setErrors({
        submit: "Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.",
      });
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-success bg-gradient-to-b from-white to-green-50">
        <div className="w-28 h-28 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 check-pop ring-8 ring-green-50">
          <CheckCircle2 className="w-14 h-14" />
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">
          Sukses!
        </h2>
        <p className="text-gray-600 text-center max-w-md text-lg font-medium leading-relaxed">
          Tanggapan Anda telah berhasil disimpan di pangkalan data nasional.
          Memuat Peta Partisipasi untuk Anda...
        </p>
      </div>
    );
  }

  // Animation variants
  const slideVariants = {
    initial: { x: 40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  return (
    <div className="min-h-[90vh] bg-[#FAFAFA] flex flex-col items-center pt-28 pb-12 px-4 relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-3xl relative z-10 w-full flex-1 flex flex-col">
        {/* Header / Intro */}
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-orange-500 mb-5">
            <Activity className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Evaluasi Diagnostik
          </h1>
          <p className="text-gray-500">
            Bantu kami memetakan indeks kesiapan ekosistem pendidikan digital
            dalam 3 langkah singkat.
          </p>
        </div>

        {/* Global Error Banner */}
        {errors.submit && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 animate-success">
            <div className="flex items-center gap-2 font-bold mb-1">
              <AlertTriangle className="w-5 h-5" /> Gagal Mengirim
            </div>
            <p className="text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Micro-Progress Bar */}
        <div
          id="tour-survei-progress"
          className="w-full bg-gray-200 h-1.5 rounded-full mb-8 overflow-hidden"
        >
          <div
            className="h-full bg-orange-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Wizard Form Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {/* STEP 1: IDENTITAS */}
            {currentStep === 1 && (
              <motion.div
                id="tour-survei-step1"
                key="step1"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Informasi Instansi Dasar
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Pastikan Anda terdaftar pada sistem.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap Anda <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama pengisi survei"
                      className={`input-field text-lg ${errors.nama ? 'border-red-300 focus:ring-red-100' : ''}`}
                    />
                    {errors.nama && (
                      <p className="inline-error mt-2">
                        <AlertTriangle className="w-4 h-4" /> {errors.nama}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Instansi / Sekolah{" "}
                      <span className="text-red-500">*</span>
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
                    {errors.namaSekolah && (
                      <p className="inline-error mt-2">
                        <AlertTriangle className="w-4 h-4" />{" "}
                        {errors.namaSekolah}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Wilayah / Kota <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="wilayah"
                      value={form.wilayah}
                      onChange={handleChange}
                      placeholder="Cth: Kota Jakarta Selatan"
                      className={`input-field text-lg ${errors.wilayah ? "input-error" : ""}`}
                    />
                    {errors.wilayah && (
                      <p className="inline-error mt-2">
                        <AlertTriangle className="w-4 h-4" /> {errors.wilayah}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: KUISIONER INTI */}
            {currentStep === 2 && (
              <motion.div
                id="tour-survei-step2"
                key="step2"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-12 pb-4"
              >
                <div className="mb-4 sticky top-0 bg-[#FAFAFA] z-20 py-4 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Pertanyaan Inti
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Pilih jawaban yang paling mewakili keadaan sesungguhnya di
                    lapangan.
                  </p>

                  {errors.survey_incomplete && (
                    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">
                        {errors.survey_incomplete}
                      </p>
                    </div>
                  )}
                </div>

                {loadingQuestions ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-orange-400 animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">
                      Memuat pertanyaan survei...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {questions.map((q, index) => (
                      <div key={q.id}>
                        <div id={`field-q${q.id}`} className="space-y-5">
                          <label className="block text-xl font-bold text-gray-800 leading-snug">
                            {index + 1}. {q.question_text}
                          </label>
                          <TileRadio
                            value={jawaban[q.id] || ""}
                            onChange={handleTileChange(q.id, index)}
                            options={q.question_options.map((opt: any) => ({
                              label: opt.option_text,
                              value: opt.option_text,
                            }))}
                          />
                          {errors[`q${q.id}`] && (
                            <p className="inline-error text-base">
                              <AlertTriangle className="w-4 h-4" />{" "}
                              {errors[`q${q.id}`]}
                            </p>
                          )}
                        </div>
                        {index < questions.length - 1 && (
                          <div className="h-px w-full bg-gray-200 mt-12"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3: PENGESAHAN */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="mb-4 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Satu Langkah Lagi!
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Pastikan Anda adalah manusia dan silakan selesaikan
                    pengiriman.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
                  <div className="space-y-4">
                    <label className="block text-base font-bold text-gray-900">
                      Validasi Keamanan Sistem{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-500">
                      Mencegah penyalahgunaan bot pada Peta Partisipasi publik.
                    </p>

                  {/* reCAPTCHA v3 Badge Info */}
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mt-4">
                    <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                    <span>
                      Formulir ini dilindungi oleh{" "}
                      <span className="font-bold text-gray-600">Google reCAPTCHA v3</span>.
                      Verifikasi berjalan otomatis di latar belakang.
                    </span>
                  </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wizard Footer Navigation */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={goToPrevStep}
            className={`flex items-center gap-2 ${currentStep === 1 ? "invisible" : "visible"}`}
          >
            <ChevronLeft className="w-5 h-5" /> Kembali
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              variant="primary"
              onClick={goToNextStep}
              disabled={loadingQuestions && currentStep === 1} // Prevent going to step 2 if still loading
            >
              Selanjutnya <ChevronRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Selesaikan Survei"}
            </Button>
          )}
        </div>

        {/* Step Indicator Text */}
        <div className="text-center mt-6">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Langkah {currentStep} dari {totalSteps}
          </span>
        </div>
      </div>

      {/* User Tour Guide Button */}
      <TourGuide
        pageName="Survei"
        steps={[
          {
            element: "#tour-survei-progress",
            popover: {
              title: "Lacak Kemajuan",
              description:
                "Survei ini sangat singkat. Anda bisa melihat progres langkah Anda di garis ini.",
            },
          },
          {
            element: "#tour-survei-step1",
            popover: {
              title: "Informasi Instansi",
              description:
                "Langkah pertama: Jangan lupa isi asal instansi/sekolah untuk dipetakan secara akurat.",
            },
          },
          {
            element: "#tour-survei-step2",
            popover: {
              title: "Jawab Pertanyaan Utama",
              description: "Di langkah kedua, kami butuh evaluasi jujur Anda.",
            },
          },
        ]}
      />
    </div>
  );
}

export default function SurveiPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      language="id"
    >
      <SurveiForm />
    </GoogleReCaptchaProvider>
  );
}
