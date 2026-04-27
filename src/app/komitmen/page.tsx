"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { supabase } from "@/lib/supabase";
import { generateKomitmenPDF, generatePiagamPDF } from "@/lib/pdfGenerator";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  PenTool,
  Download,
  RefreshCw,
  CheckCircle2,
  ChevronDown,
  Lock,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { JourneyBar } from "@/components/JourneyBar";
import { TourGuide } from "@/components/TourGuide";
import { SchoolAutocomplete } from "@/components/SchoolAutocomplete";
import { useRouter } from "next/navigation";
import { submitKomitmen } from "@/app/actions/komitmen";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

function KomitmenForm() {
  const router = useRouter();
  const sigCanvas = useRef<SignatureCanvas>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPillars, setShowPillars] = useState(false);
  const [downloadingPiagam, setDownloadingPiagam] = useState(false);

  const [form, setForm] = useState({ sekolah: "", penanggungJawab: "" });
  const [selectedSchoolStatus, setSelectedSchoolStatus] = useState<
    string | null
  >(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isLocked =
    form.sekolah.length > 0 &&
    selectedSchoolStatus !== "survei" &&
    selectedSchoolStatus !== "komitmen";

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    let validationErrors: Record<string, string> = {};

    if (!form.sekolah)
      validationErrors.sekolah = "Pilih sekolah yang terdaftar";
    if (!form.penanggungJawab)
      validationErrors.penanggungJawab = "Nama penanggung jawab wajib diisi";
    if (sigCanvas.current?.isEmpty())
      validationErrors.signature = "Harap isi tanda tangan digital";
    if (isLocked)
      validationErrors.locked =
        "Sekolah harus menyelesaikan survei terlebih dahulu";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!executeRecaptcha) {
      setErrors({ submit: "reCAPTCHA belum siap, mohon tunggu sebentar." });
      return;
    }

    setLoading(true);

    let captchaToken = "";
    try {
      captchaToken = await executeRecaptcha("komitmen_submit");
    } catch {
      setErrors({ submit: "Gagal menjalankan verifikasi reCAPTCHA. Coba lagi." });
      setLoading(false);
      return;
    }
    try {
      const signatureDataUrl = sigCanvas
        .current!.getTrimmedCanvas()
        .toDataURL("image/png");

      let storageUrl = "";
      try {
        const res = await fetch(signatureDataUrl);
        const blob = await res.blob();
        const fileName = `signature_${Date.now()}_${form.sekolah.replace(/[^a-z0-9]/gi, "_")}.png`;

        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("signatures")
            .upload(fileName, blob, { contentType: "image/png" });

        if (storageError) throw storageError;

        const { data: publicUrlData } = supabase.storage
          .from("signatures")
          .getPublicUrl(fileName);
        storageUrl = publicUrlData.publicUrl;
      } catch (e) {
        console.warn(
          "Storage failed/unconfigured, defaulting to base64 inline",
          e,
        );
        storageUrl = signatureDataUrl;
      }

      // Call Server Action
      const result = await submitKomitmen({
        sekolahId: selectedSchoolId || undefined,
        sekolah: form.sekolah,
        penanggungJawab: form.penanggungJawab,
        signatureUrl: storageUrl,
        captchaToken,
      });

      if (!result.success) {
        setErrors({ submit: result.error || "Terjadi kesalahan" });
        setLoading(false);
        return;
      }

      // Generate & Download PDF Locally
      generateKomitmenPDF(form.sekolah, form.penanggungJawab, signatureDataUrl);

      setSuccess(true);
      setTimeout(() => {
        router.push(`/peta?schoolId=${result.schoolId || ""}&from=komitmen`);
      }, 4000);
    } catch (error) {
      console.error(error);
      setErrors({
        submit: "Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center success-card">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 check-pop">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Komitmen Berhasil Disahkan!
        </h2>
        <p className="text-gray-600 max-w-lg mb-8 text-lg">
          Sertifikat PDF komitmen digital Anda telah diunduh. Terima kasih atas
          partisipasi aktif{" "}
          <strong className="text-gray-900">{form.sekolah}</strong> dalam
          menjaga ekosistem pendidikan digital.
        </p>
        <Button
          onClick={() => (window.location.href = "/peta")}
          className="flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
        >
          <Download className="w-5 h-5" /> Beralih ke Peta Partisipasi
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-12">
      <JourneyBar />

      <div
        className="text-center mb-10 animate-success"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="inline-flex p-4 rounded-3xl bg-rose-50 text-rose-500 mb-6 shadow-sm border border-rose-100">
          <PenTool className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Kontrak Komitmen Bersama
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
          Tunjukkan dedikasi nyata sekolah Anda melalui penandatanganan digital
          untuk menetapkan regulasi gadget yang lebih sehat.
        </p>
      </div>

      <div
        className="flex flex-col gap-6 animate-success"
        style={{ animationDelay: "0.2s" }}
      >
        {/* Accordion Pilar Komitmen */}
        <div
          id="tour-komitmen-pilar"
          className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm transition-all"
        >
          <button
            type="button"
            onClick={() => setShowPillars(!showPillars)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white hover:bg-orange-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-gray-900">
                Baca 5 Pilar Komitmen Nasional
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${showPillars ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`transition-all duration-300 ease-in-out ${showPillars ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="p-6 pt-2 border-t border-gray-100 bg-white">
              <ul className="text-sm text-gray-700 space-y-4">
                <li className="flex gap-3">
                  <span className="font-black text-orange-500 shrink-0 select-none">
                    01
                  </span>
                  Memastikan perangkat digital digunakan{" "}
                  <strong className="font-semibold text-gray-900">
                    khusus untuk menunjang pendidikan
                  </strong>
                  .
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-orange-500 shrink-0 select-none">
                    02
                  </span>
                  Menetapkan{" "}
                  <strong className="font-semibold text-gray-900">
                    aturan tegas batasan waktu akses gawai
                  </strong>{" "}
                  di area sekolah.
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-orange-500 shrink-0 select-none">
                    03
                  </span>
                  Mensosialisasikan bahaya cyberbullying & dampaknya pada{" "}
                  <strong className="font-semibold text-gray-900">
                    kesehatan mental
                  </strong>
                  .
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-orange-500 shrink-0 select-none">
                    04
                  </span>
                  Memberikan ruang diskusi literasi dan{" "}
                  <strong className="font-semibold text-gray-900">
                    etika digital
                  </strong>{" "}
                  bagi siswa.
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-orange-500 shrink-0 select-none">
                    05
                  </span>
                  Melibatkan{" "}
                  <strong className="font-semibold text-gray-900">
                    orang tua
                  </strong>{" "}
                  dalam memantau penggunaan gadget anak di rumah.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {errors.submit && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
            <div className="flex items-center gap-2 font-bold mb-1">
              <AlertTriangle className="w-5 h-5" /> Gagal Mengesahkan
            </div>
            <p className="text-sm">{errors.submit}</p>
          </div>
        )}

        <Card
          id="tour-komitmen-form"
          className="p-6 md:p-10 bg-white shadow-xl shadow-orange-900/5 border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sekolah Field */}
            <div className="space-y-2 relative">
              <label className="block text-sm font-bold text-gray-900">
                Instansi / Sekolah <span className="text-red-500">*</span>
              </label>
              <SchoolAutocomplete
                value={form.sekolah}
                onChange={(val, school) => {
                  setForm((prev) => ({ ...prev, sekolah: val }));
                  setSelectedSchoolStatus(school ? school.status : null);
                  setSelectedSchoolId(school ? school.id : null);
                  if (errors.sekolah)
                    setErrors((prev) => ({ ...prev, sekolah: "" }));
                  if (errors.locked)
                    setErrors((prev) => ({ ...prev, locked: "" }));
                }}
                placeholder="Ketik nama sekolah Anda"
                hasError={!!errors.sekolah || isLocked}
              />
              {errors.sekolah && (
                <p className="inline-error">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.sekolah}
                </p>
              )}

              {isLocked && (
                <div className="mt-4 p-5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col items-start gap-3 animate-slide-in-down shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-1">Akses Terkunci</p>
                      <p className="text-sm text-amber-800 leading-relaxed font-medium">
                        Sekolah{" "}
                        <strong className="text-amber-900 tracking-tight">
                          &quot;{form.sekolah}&quot;
                        </strong>{" "}
                        belum menyelesaikan tahap Survei Diagnostik. Pengisian
                        komitmen memerlukan data survei sebagai basis awal.
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => (window.location.href = "/survei")}
                    variant="outline"
                    className="bg-white hover:bg-amber-100 border-amber-300 text-amber-800 mt-1 ml-11 md:w-auto w-full"
                  >
                    Selesaikan Survei (Tahap 1)
                  </Button>
                </div>
              )}
            </div>

            {/* Nama Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Nama Penanggung Jawab <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                value={form.penanggungJawab}
                onChange={(e) => {
                  setForm({ ...form, penanggungJawab: e.target.value });
                  if (errors.penanggungJawab)
                    setErrors((prev) => ({ ...prev, penanggungJawab: "" }));
                }}
                className={`form-input bg-gray-50 ${errors.penanggungJawab ? "input-error" : ""}`}
                placeholder="Cth: Bpk. Budi Santoso, S.Pd (Kepala Sekolah)"
              />
              {errors.penanggungJawab && (
                <p className="inline-error">
                  <AlertTriangle className="w-3.5 h-3.5" />{" "}
                  {errors.penanggungJawab}
                </p>
              )}
            </div>

            {/* Live Preview Piagam */}
            <div className="space-y-3" id="tour-komitmen-preview">
              <label className="block text-sm font-bold text-gray-900">
                Pratinjau Piagam Apresiasi{" "}
                <span className="text-gray-400 font-medium ml-2">
                  (Sistem Otomatis)
                </span>
              </label>
              <div className="relative w-full aspect-[1.414] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm group">
                {/* SVG Background */}
                <img
                  src="/assets/Piagam-GESAMEGA.jpg"
                  alt="Template Piagam GESAMEGA"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    // Fallback if SVG fails to load
                    (e.target as HTMLImageElement).src =
                      "/assets/Piagam-GESAMEGA.pdf";
                  }}
                />

                {/* Overlay Content - Precisely Positioned */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* School / Instansi */}
                  {(() => {
                    const sekolah = form.sekolah || "INSTANSI / SEKOLAH";
                    const words = sekolah.trim().split(/\s+/);
                    const isMultiLine = words.length > 3;

                    const firstLine = words.slice(0, 3).join(" ");
                    const secondLine = words.slice(3).join(" ");

                    return (
                      <div
                        className={`absolute ${
                          isMultiLine ? "top-[61%]" : "top-[64%]"
                        } left-0 right-0 text-center px-20`}
                      >
                        <h3 className="font-serif font-bold text-slate-800 uppercase tracking-[0.05em] leading-[0.9]">
                          <span className="block text-[14px] sm:text-[16px] md:text-[20px] lg:text-[26px]">
                            {isMultiLine ? firstLine : sekolah}
                          </span>

                          {isMultiLine && (
                            <span className="block text-[14px] sm:text-[16px] md:text-[20px] lg:text-[26px] mt-[2px]">
                              {secondLine}
                            </span>
                          )}
                        </h3>
                      </div>
                    );
                  })()}

                  {/* Date */}
                  <div className="absolute top-[77%] left-3 right-0 text-center px-8">
                    <p className="text-[8px] sm:text-[10px] md:text-[12px] font-serif font-bold text-slate-600 uppercase tracking-[0.08em]">
                      {new Date().toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Piagam Button */}
              <button
                type="button"
                disabled={!form.sekolah || downloadingPiagam}
                onClick={async () => {
                  if (!form.sekolah) return;
                  setDownloadingPiagam(true);
                  try {
                    await generatePiagamPDF(form.sekolah);
                  } catch (err) {
                    console.error("Gagal generate piagam:", err);
                  } finally {
                    setDownloadingPiagam(false);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-orange-200 bg-orange-50 text-orange-700 font-bold text-sm hover:bg-orange-100 hover:border-orange-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                {downloadingPiagam ? "Memproses Piagam..." : "Unduh Piagam Apresiasi (.pdf)"}
              </button>
            </div>

            {/* Signature Field */}
            <div id="tour-komitmen-signature" className="space-y-3">
              <label className="block text-sm font-bold text-gray-900">
                Tanda Tangan Digital <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 rounded-2xl overflow-hidden relative transition-colors ${
                  isLocked
                    ? "bg-gray-100/50 border-gray-200 cursor-not-allowed opacity-60"
                    : errors.signature
                      ? "bg-red-50/50 border-red-300"
                      : "bg-white border-gray-200 hover:border-orange-300 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-50"
                }`}
                onClick={() => {
                  if (errors.signature)
                    setErrors((prev) => ({ ...prev, signature: "" }));
                }}
              >
                {isLocked && (
                  <div
                    className="absolute inset-0 z-10 backdrop-blur-[1px]"
                    title="Selesaikan langkah survei terlebih dahulu"
                  />
                )}

                {/* Visual Hint */}
                {!isLocked && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-gray-200 font-bold text-2xl tracking-widest uppercase select-none opacity-50 text-center flex flex-col items-center">
                    <PenTool className="w-8 h-8 mb-2 opacity-50" />
                    Tanda Tangan Di Sini
                  </div>
                )}

                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{
                    className: "w-full h-48 cursor-crosshair relative z-10",
                  }}
                  onBegin={() => {
                    if (errors.signature)
                      setErrors((prev) => ({ ...prev, signature: "" }));
                  }}
                />

                <button
                  type="button"
                  onClick={clearSignature}
                  className="absolute bottom-3 right-3 z-20 text-xs font-semibold flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Bersihkan
                </button>
              </div>
              {errors.signature && (
                <p className="inline-error">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.signature}
                </p>
              )}
            </div>

            {/* Verification Block — Google reCAPTCHA v3 (invisible, auto-verified on submit) */}
            <div className="pt-6 mt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                <span>
                  Formulir ini dilindungi oleh{" "}
                  <span className="font-bold text-gray-600">Google reCAPTCHA v3</span>.
                  Verifikasi berjalan otomatis di latar belakang.
                </span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gray-900 hover:bg-black text-white rounded-xl shadow-xl shadow-gray-900/10 py-7 text-lg border-0 transition-transform active:scale-[0.98]"
              disabled={
                loading ||
                isLocked ||
                form.sekolah.length === 0
              }
            >
              {loading
                ? "Mempreses Dokumen PDF & Menyimpan..."
                : "Sahkan & Unduh Sertifikat PDF Resmi"}
            </Button>
          </form>
        </Card>
      </div>

      <TourGuide
        pageName="Komitmen"
        steps={[
          {
            element: "#tour-journey-bar",
            popover: {
              title: "Tahap Akhir",
              description:
                "Anda berada di tahap ke-3 (terakhir) untuk meresmikan partisipasi sekolah.",
            },
          },
          {
            element: "#tour-komitmen-pilar",
            popover: {
              title: "Pilar Ekosistem",
              description:
                "Klik untuk membaca dan menyepakati 5 prinsip dasar penggunaan gadget yang sehat dan aman.",
            },
          },
          {
            element: "#tour-komitmen-form",
            popover: {
              title: "Legalitas",
              description:
                "Isi dengan cermat identitas instansi dan Penanggung Jawab sekolah Anda.",
            },
          },
          {
            element: "#tour-komitmen-signature",
            popover: {
              title: "Tanda Tangan",
              description:
                "Torehkan tanda tangan Anda secara digital di sini sebagai bukti pengesahan sertifikat.",
            },
          },
        ]}
      />
    </div>
  );
}

export default function KomitmenPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      language="id"
    >
      <KomitmenForm />
    </GoogleReCaptchaProvider>
  );
}
