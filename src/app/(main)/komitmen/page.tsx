"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { supabase } from "@/lib/supabase";
import { generateKomitmenPDF, generatePiagamPDF } from "@/lib/pdfGenerator";
import { Button } from "@/components/ui/Button";
import {
  PenTool, Download, RefreshCw, CheckCircle2,
  ChevronDown, Lock, ShieldCheck, AlertTriangle, Sparkles,
} from "lucide-react";
import { JourneyBar } from "@/components/JourneyBar";
import { TourGuide } from "@/components/TourGuide";
import { SchoolAutocomplete } from "@/components/SchoolAutocomplete";
import { useRouter } from "next/navigation";
import { submitKomitmen } from "@/app/actions/komitmen";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { motion, AnimatePresence } from "framer-motion";

const PILLARS = [
  { num: "01", text: "Memastikan perangkat digital digunakan", bold: "khusus untuk menunjang pendidikan" },
  { num: "02", text: "Menetapkan", bold: "aturan tegas batasan waktu akses gawai", suffix: "di area sekolah." },
  { num: "03", text: "Mensosialisasikan bahaya cyberbullying & dampaknya pada", bold: "kesehatan mental" },
  { num: "04", text: "Memberikan ruang diskusi literasi dan", bold: "etika digital", suffix: "bagi siswa." },
  { num: "05", text: "Melibatkan", bold: "orang tua", suffix: "dalam memantau penggunaan gadget anak di rumah." },
];

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "white",
};

const inputClass = "w-full px-4 py-3 rounded-xl outline-none transition-all text-sm font-medium placeholder:text-white/25 focus:border-orange-500/50";

function KomitmenForm() {
  const router = useRouter();
  const sigCanvas = useRef<SignatureCanvas>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPillars, setShowPillars] = useState(false);
  const [downloadingPiagam, setDownloadingPiagam] = useState(false);
  const [form, setForm] = useState({ sekolah: "", penanggungJawab: "" });
  const [selectedSchoolStatus, setSelectedSchoolStatus] = useState<string | null>(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isLocked = form.sekolah.length > 0 && selectedSchoolStatus !== "survei" && selectedSchoolStatus !== "komitmen";

  const clearSignature = () => sigCanvas.current?.clear();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const ve: Record<string, string> = {};
    if (!form.sekolah) ve.sekolah = "Pilih sekolah yang terdaftar";
    if (!form.penanggungJawab) ve.penanggungJawab = "Nama penanggung jawab wajib diisi";
    if (sigCanvas.current?.isEmpty()) ve.signature = "Harap isi tanda tangan digital";
    if (isLocked) ve.locked = "Sekolah harus menyelesaikan survei terlebih dahulu";
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }
    if (!executeRecaptcha) { setErrors({ submit: "reCAPTCHA belum siap." }); return; }
    setLoading(true);
    let captchaToken = "";
    try { captchaToken = await executeRecaptcha("komitmen_submit"); }
    catch (err: any) { setErrors({ submit: `Gagal verifikasi: ${err?.message}` }); setLoading(false); return; }
    try {
      const signatureDataUrl = sigCanvas.current!.getTrimmedCanvas().toDataURL("image/png");
      let storageUrl = signatureDataUrl;
      try {
        const blob = await (await fetch(signatureDataUrl)).blob();
        const fileName = `signature_${Date.now()}_${form.sekolah.replace(/[^a-z0-9]/gi, "_")}.png`;
        const { error: se } = await supabase.storage.from("signatures").upload(fileName, blob, { contentType: "image/png" });
        if (!se) storageUrl = supabase.storage.from("signatures").getPublicUrl(fileName).data.publicUrl;
      } catch {}
      const result = await submitKomitmen({ sekolahId: selectedSchoolId || undefined, sekolah: form.sekolah, penanggungJawab: form.penanggungJawab, signatureUrl: storageUrl, captchaToken });
      if (!result.success) { setErrors({ submit: result.error || "Terjadi kesalahan" }); setLoading(false); return; }
      generateKomitmenPDF(form.sekolah, form.penanggungJawab, signatureDataUrl);
      setSuccess(true);
      setTimeout(() => router.push(`/peta?schoolId=${result.schoolId || ""}&from=komitmen`), 4000);
    } catch { setErrors({ submit: "Terjadi kesalahan sistem." }); }
    finally { setLoading(false); }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center" style={{ background: "#050505" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)", mixBlendMode: "screen" }} />
        </div>
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(16,185,129,0.15)", boxShadow: "0 0 50px rgba(16,185,129,0.30)", color: "#10b981" }}>
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl font-extrabold text-white mb-4">Komitmen Berhasil Disahkan!</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-md mb-8 text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
          Sertifikat PDF komitmen digital Anda telah diunduh. Terima kasih atas partisipasi aktif <strong className="text-white">{form.sekolah}</strong> dalam menjaga ekosistem pendidikan digital.
        </motion.p>
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          onClick={() => (window.location.href = "/peta")}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #ea580c, #f97316)", boxShadow: "0 0 32px rgba(249,115,22,0.40)" }}>
          <Download className="w-5 h-5" /> Beralih ke Peta Partisipasi
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-20" style={{ background: "#050505" }}>
      {/* Glowing Mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[5%] right-[5%] w-[650px] h-[650px] rounded-full" style={{ background: "radial-gradient(circle, rgba(234,88,12,0.10) 0%, transparent 70%)", mixBlendMode: "screen" }} />
        <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)", mixBlendMode: "screen" }} />
        <div className="absolute top-0 left-0 right-0 h-[300px]" style={{ background: "linear-gradient(180deg, rgba(234,88,12,0.05) 0%, transparent 100%)" }} />
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-28 relative z-10">
        <JourneyBar />

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl mb-5" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
            <PenTool className="w-8 h-8" style={{ color: "#fb923c" }} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Kontrak Komitmen Bersama</h1>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.38)" }}>Tunjukkan dedikasi nyata sekolah Anda melalui penandatanganan digital untuk menetapkan regulasi gadget yang lebih sehat.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-5">

          {/* Pilar Accordion */}
          <div id="tour-komitmen-pilar" className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <button type="button" onClick={() => setShowPillars(!showPillars)}
              className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-bold text-white text-sm">Baca 5 Pilar Komitmen Nasional</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${showPillars ? "rotate-180" : ""}`} style={{ color: "rgba(255,255,255,0.35)" }} />
            </button>
            <AnimatePresence>
              {showPillars && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                  <div className="px-6 pb-6 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <ul className="space-y-4">
                      {PILLARS.map((p) => (
                        <li key={p.num} className="flex gap-3 text-sm">
                          <span className="font-black shrink-0 select-none" style={{ color: "#fb923c" }}>{p.num}</span>
                          <span style={{ color: "rgba(255,255,255,0.45)" }}>
                            {p.text} <strong className="font-semibold text-white">{p.bold}</strong>{p.suffix ? ` ${p.suffix}` : "."}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error Banner */}
          {errors.submit && (
            <div className="p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.25)" }}>
              <div className="flex items-center gap-2 font-bold mb-1 text-red-400"><AlertTriangle className="w-5 h-5" /> Gagal Mengesahkan</div>
              <p className="text-sm text-red-400/80">{errors.submit}</p>
            </div>
          )}

          {/* Main Form Card */}
          <div id="tour-komitmen-form" className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <form onSubmit={handleSubmit} className="space-y-7">

              {/* Sekolah */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-white/65">Instansi / Sekolah <span className="text-red-400">*</span></label>
                <SchoolAutocomplete
                  value={form.sekolah}
                  onChange={(val, school) => {
                    setForm((prev) => ({ ...prev, sekolah: val }));
                    setSelectedSchoolStatus(school ? school.status : null);
                    setSelectedSchoolId(school ? school.id : null);
                    if (errors.sekolah) setErrors((prev) => ({ ...prev, sekolah: "" }));
                    if (errors.locked) setErrors((prev) => ({ ...prev, locked: "" }));
                  }}
                  placeholder="Ketik nama sekolah Anda"
                  hasError={!!errors.sekolah || isLocked}
                />
                {errors.sekolah && <p className="flex items-center gap-1.5 text-xs text-red-400"><AlertTriangle className="w-3.5 h-3.5" /> {errors.sekolah}</p>}
                <AnimatePresence>
                  {isLocked && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-3 p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)" }}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}><Lock className="w-4 h-4" /></div>
                        <div>
                          <p className="font-bold text-sm mb-1" style={{ color: "#f59e0b" }}>Akses Terkunci</p>
                          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Sekolah <strong className="text-white">"{form.sekolah}"</strong> belum menyelesaikan Survei Diagnostik.
                          </p>
                          <button type="button" onClick={() => (window.location.href = "/survei")}
                            className="mt-3 text-sm font-bold px-4 py-2 rounded-lg transition-all"
                            style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.30)", color: "#f59e0b" }}>
                            Selesaikan Survei (Tahap 1) →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Nama PJ */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-white/65">Nama Penanggung Jawab <span className="text-red-400">*</span></label>
                <input
                  type="text" value={form.penanggungJawab}
                  onChange={(e) => { setForm({ ...form, penanggungJawab: e.target.value }); if (errors.penanggungJawab) setErrors((p) => ({ ...p, penanggungJawab: "" })); }}
                  className={inputClass} style={inputStyle}
                  placeholder="Cth: Bpk. Budi Santoso, S.Pd (Kepala Sekolah)"
                />
                {errors.penanggungJawab && <p className="flex items-center gap-1.5 text-xs text-red-400"><AlertTriangle className="w-3.5 h-3.5" /> {errors.penanggungJawab}</p>}
              </div>

              {/* Piagam Preview */}
              <div className="space-y-3" id="tour-komitmen-preview">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-white/65">Pratinjau Piagam Apresiasi</label>
                  <span className="text-xs text-white/25">Otomatis</span>
                </div>
                <div className="relative w-full aspect-[1.414] rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
                  <img src="/assets/Piagam-GESAMEGA.jpg" alt="Template Piagam" className="absolute inset-0 w-full h-full object-cover opacity-90" onError={(e) => { (e.target as HTMLImageElement).src = "/assets/Piagam-GESAMEGA.pdf"; }} />
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    {(() => {
                      const sekolah = form.sekolah || "INSTANSI / SEKOLAH";
                      const words = sekolah.trim().split(/\s+/);
                      const isMulti = words.length > 3;
                      return (
                        <div className={`absolute ${isMulti ? "top-[61%]" : "top-[64%]"} left-0 right-0 text-center px-20`}>
                          <h3 className="font-serif font-bold text-slate-800 uppercase tracking-[0.05em] leading-[0.9]">
                            <span className="block text-[14px] sm:text-[16px] md:text-[20px] lg:text-[26px]">{isMulti ? words.slice(0,3).join(" ") : sekolah}</span>
                            {isMulti && <span className="block text-[14px] sm:text-[16px] md:text-[20px] lg:text-[26px] mt-[2px]">{words.slice(3).join(" ")}</span>}
                          </h3>
                        </div>
                      );
                    })()}
                    <div className="absolute top-[77%] left-3 right-0 text-center px-8">
                      <p className="text-[8px] sm:text-[10px] md:text-[12px] font-serif font-bold text-slate-600 uppercase tracking-[0.08em]">
                        {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long" })}
                      </p>
                    </div>
                  </div>
                </div>
                <button type="button" disabled={!form.sekolah || downloadingPiagam}
                  onClick={async () => { if (!form.sekolah) return; setDownloadingPiagam(true); try { await generatePiagamPDF(form.sekolah); } finally { setDownloadingPiagam(false); } }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "rgba(249,115,22,0.10)", border: "1px solid rgba(249,115,22,0.22)", color: "#fb923c" }}>
                  <Download className="w-4 h-4" />
                  {downloadingPiagam ? "Memproses Piagam..." : "Unduh Piagam Apresiasi (.pdf)"}
                </button>
              </div>

              {/* Signature */}
              <div id="tour-komitmen-signature" className="space-y-3">
                <label className="block text-sm font-bold text-white/65">Tanda Tangan Digital <span className="text-red-400">*</span></label>
                <div className={`border-2 rounded-2xl overflow-hidden relative transition-all ${isLocked ? "opacity-50 cursor-not-allowed" : errors.signature ? "border-red-500/40" : "border-white/10 hover:border-orange-500/30"}`}
                  style={{ background: isLocked ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.03)" }}
                  onClick={() => { if (errors.signature) setErrors((p) => ({ ...p, signature: "" })); }}>
                  {isLocked && <div className="absolute inset-0 z-10 backdrop-blur-[1px]" />}
                  {!isLocked && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center select-none" style={{ color: "rgba(255,255,255,0.10)" }}>
                      <PenTool className="w-8 h-8 mb-2" />
                      <span className="text-lg font-bold uppercase tracking-widest">Tanda Tangan Di Sini</span>
                    </div>
                  )}
                  <SignatureCanvas ref={sigCanvas}
                    canvasProps={{ className: "w-full h-48 cursor-crosshair relative z-10", style: { background: "transparent" } }}
                    onBegin={() => { if (errors.signature) setErrors((p) => ({ ...p, signature: "" })); }}
                  />
                  <button type="button" onClick={clearSignature}
                    className="absolute bottom-3 right-3 z-20 text-xs font-semibold flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" }}>
                    <RefreshCw className="w-3.5 h-3.5" /> Bersihkan
                  </button>
                </div>
                {errors.signature && <p className="flex items-center gap-1.5 text-xs text-red-400"><AlertTriangle className="w-3.5 h-3.5" /> {errors.signature}</p>}
              </div>

              {/* reCAPTCHA note */}
              <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-3 text-xs font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500/60" />
                  <span>Formulir ini dilindungi oleh <span className="text-white/45 font-bold">Google reCAPTCHA v3</span>. Verifikasi berjalan otomatis.</span>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading || isLocked || form.sekolah.length === 0}
                className="w-full py-5 rounded-2xl font-bold text-white text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={loading || isLocked || !form.sekolah ? { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" } : { background: "linear-gradient(135deg, #ea580c, #f97316)", boxShadow: "0 0 32px rgba(249,115,22,0.35)" }}>
                {loading ? "Memproses Dokumen PDF & Menyimpan..." : "Sahkan & Unduh Sertifikat PDF Resmi"}
              </button>
            </form>
          </div>
        </motion.div>

      </div>

      <TourGuide pageName="Komitmen" steps={[
        { element: "#tour-journey-bar", popover: { title: "Tahap Akhir", description: "Anda berada di tahap ke-3 (terakhir) untuk meresmikan partisipasi sekolah." } },
        { element: "#tour-komitmen-pilar", popover: { title: "Pilar Ekosistem", description: "Klik untuk membaca dan menyepakati 5 prinsip dasar penggunaan gadget yang sehat." } },
        { element: "#tour-komitmen-form", popover: { title: "Legalitas", description: "Isi dengan cermat identitas instansi dan Penanggung Jawab sekolah Anda." } },
        { element: "#tour-komitmen-signature", popover: { title: "Tanda Tangan", description: "Torehkan tanda tangan Anda secara digital di sini sebagai bukti pengesahan." } },
      ]} />
    </div>
  );
}

export default function KomitmenPage() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} language="id">
      <KomitmenForm />
    </GoogleReCaptchaProvider>
  );
}
