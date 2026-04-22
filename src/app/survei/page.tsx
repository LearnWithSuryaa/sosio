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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TourGuide } from "@/components/TourGuide";

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
              className={`font-semibold text-lg transition-colors ${value === opt.value ? "text-orange-600" : "text-gray-700 group-hover:text-orange-900"}`}
            >
              {opt.label}
            </span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${value === opt.value ? "bg-orange-500 text-white scale-100 opacity-100" : "scale-75 opacity-0"}`}
            >
              <Check className="w-4 h-4" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function SurveiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [form, setForm] = useState({
    nama: "",
    namaSekolah: "",
    wilayah: "",
    q1: "",
    q2: "",
    q3: "",
  });

  const [captchaToken, setCaptchaToken] = useState<string>("");

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

  const handleTileChange = (name: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Auto-scroll conversational feeling: Auto advance step if Q3 is answered, else small delay to jump to next Q.
    // However, since it is one screen per step, we will only handle logic if it's the last question in the step.
    // We only have 3 questions in step 2. We can auto-scroll down to the next question.
    const fields = ["q1", "q2", "q3"];
    const idx = fields.indexOf(name);
    if (idx !== -1 && idx < fields.length - 1) {
      setTimeout(() => {
        document
          .getElementById(`field-${fields[idx + 1]}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  };

  const validateStep = (step: number) => {
    let valid = true;
    let stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (!form.namaSekolah) {
        stepErrors.namaSekolah = "Nama Sekolah wajib diisi";
        valid = false;
      }
      if (!form.wilayah) {
        stepErrors.wilayah = "Wilayah wajib diisi";
        valid = false;
      }
    } else if (step === 2) {
      if (!form.q1) {
        stepErrors.q1 = "Wajib dipilih";
        valid = false;
      }
      if (!form.q2) {
        stepErrors.q2 = "Wajib dipilih";
        valid = false;
      }
      if (!form.q3) {
        stepErrors.q3 = "Wajib dipilih";
        valid = false;
      }
    }

    setErrors(stepErrors);
    return valid;
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentStep((p) => Math.min(p + 1, totalSteps));
    }
  };

  const goToPrevStep = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep((p) => Math.max(p - 1, 1));
  };

  const handleSubmit = async () => {
    setErrors({});
    if (!captchaToken) {
      setErrors({ captcha: "Mohon selesaikan validasi keamanan" });
      return;
    }

    setLoading(true);

    try {
      const result = await submitSurvey({
        ...form,
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
      <div className="w-full max-w-2xl relative z-10 w-full flex-1 flex flex-col">
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
                      Nama Lengkap Anda{" "}
                      <span className="text-gray-400 font-normal">
                        (Opsional)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama pengisi survei"
                      className="input-field text-lg"
                    />
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
                      <p className="inline-error">
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
                      <p className="inline-error">
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
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Pertanyaan Inti
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Pilih jawaban yang paling mewakili keadaan sesungguhnya di
                    lapangan.
                  </p>
                </div>

                <div id="field-q1" className="space-y-5">
                  <label className="block text-xl font-bold text-gray-800 leading-snug">
                    1. Berapa lama rata-rata penggunaan gadget murni untuk
                    hiburan di sekolah?
                  </label>
                  <TileRadio
                    value={form.q1}
                    onChange={handleTileChange("q1")}
                    options={[
                      { label: "Kurang dari 1 jam", value: "< 1 jam" },
                      { label: "1 hingga 3 jam", value: "1 - 3 jam" },
                      { label: "Lebih dari 3 jam", value: "> 3 jam" },
                    ]}
                  />
                  {errors.q1 && (
                    <p className="inline-error text-base">
                      <AlertTriangle className="w-4 h-4" /> {errors.q1}
                    </p>
                  )}
                </div>

                <div className="h-px w-full bg-gray-200"></div>

                <div id="field-q2" className="space-y-5">
                  <label className="block text-xl font-bold text-gray-800 leading-snug">
                    2. Apakah di sekolah terdapat aturan tertulis terkait
                    batasan penggunaan HP?
                  </label>
                  <TileRadio
                    value={form.q2}
                    onChange={handleTileChange("q2")}
                    options={[
                      {
                        label: "Ya, dan sangat ketat diterapkan",
                        value: "Ya, sangat ketat",
                      },
                      {
                        label: "Ada aturannya, tapi kurang tegas diterapkan",
                        value: "Ada, tapi tidak tegas",
                      },
                      {
                        label: "Belum ada aturan tertulis sama sekali",
                        value: "Tidak ada",
                      },
                    ]}
                  />
                  {errors.q2 && (
                    <p className="inline-error text-base">
                      <AlertTriangle className="w-4 h-4" /> {errors.q2}
                    </p>
                  )}
                </div>

                <div className="h-px w-full bg-gray-200"></div>

                <div id="field-q3" className="space-y-5">
                  <label className="block text-xl font-bold text-gray-800 leading-snug">
                    3. Secara jujur, bagaimana dampak regulasi (atau absennya
                    regulasi) gadget saat ini terhadap fokus belajar siswa?
                  </label>
                  <TileRadio
                    value={form.q3}
                    onChange={handleTileChange("q3")}
                    options={[
                      {
                        label:
                          "Sangat membantu konsentrasi, kelas lebih interaktif",
                        value: "Sangat Membantu",
                      },
                      {
                        label: "Biasa saja atau kami netral",
                        value: "Biasa Saja",
                      },
                      {
                        label:
                          "Cukup mengganggu; distraksi dari sosmed dsb tinggi",
                        value: "Mengganggu",
                      },
                    ]}
                  />
                  {errors.q3 && (
                    <p className="inline-error text-base">
                      <AlertTriangle className="w-4 h-4" /> {errors.q3}
                    </p>
                  )}
                </div>
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

                    <div
                      className={`mt-4 px-5 py-4 border-2 rounded-xl flex items-center gap-4 transition-all ${errors.captcha ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200 hover:border-orange-200"}`}
                    >
                      <input
                        type="checkbox"
                        id="captcha"
                        onChange={(e) => {
                          setCaptchaToken(
                            e.target.checked ? "mock_token_" + Date.now() : "",
                          );
                          if (errors.captcha)
                            setErrors((prev) => ({ ...prev, captcha: "" }));
                        }}
                        className="w-6 h-6 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                      />
                      <label
                        htmlFor="captcha"
                        className="text-sm font-bold text-gray-800 select-none cursor-pointer flex-1"
                      >
                        Ya, saya mengkonfirmasi tanggapan ini.
                      </label>
                    </div>
                    {errors.captcha && (
                      <p className="text-sm text-red-500 flex items-center gap-1 font-bold mt-2">
                        <AlertTriangle className="w-4 h-4" /> {errors.captcha}
                      </p>
                    )}
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
            <Button type="button" variant="primary" onClick={goToNextStep}>
              Selanjutnya <ChevronRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              disabled={loading || !captchaToken}
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
              description:
                "Di langkah kedua, kami butuh evaluasi jujur Anda. Terdapat 3 butir pertanyaan inti.",
            },
          },
        ]}
      />
    </div>
  );
}
