"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { supabase } from "@/lib/supabase";
import { generateKomitmenPDF } from "@/lib/pdfGenerator";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PenTool, Download, RefreshCw, CheckCircle2 } from "lucide-react";
import { JourneyBar } from "@/components/JourneyBar";
import { SchoolAutocomplete } from "@/components/SchoolAutocomplete";
import { useRouter } from "next/navigation";

export default function KomitmenPage() {
  const router = useRouter();
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ sekolah: "", penanggungJawab: "" });
  const [selectedSchoolStatus, setSelectedSchoolStatus] = useState<string | null>(null);

  const isLocked = form.sekolah.length > 0 && selectedSchoolStatus !== "survei" && selectedSchoolStatus !== "komitmen";

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sigCanvas.current?.isEmpty()) {
      alert("Harap isi tanda tangan terlebih dahulu.");
      return;
    }
    setLoading(true);

    try {
      const signatureDataUrl = sigCanvas.current!.getTrimmedCanvas().toDataURL("image/png");

      // 1. Storage to supabase (optional depending on strict DB requirements, but asked to save to Storage)
      // Convert data url to blob
      const res = await fetch(signatureDataUrl);
      const blob = await res.blob();
      const fileName = `signature_${Date.now()}_${form.sekolah.replace(/[^a-z0-9]/gi, '_')}.png`;

      // Wait for upload - gracefully degrading if not fully configured 
      let storageUrl = "";
      try {
         const { data: storageData, error: storageError } = await supabase.storage
          .from("signatures")
          .upload(fileName, blob, { contentType: "image/png" });

          if (storageError) throw storageError;

          const { data: publicUrlData } = supabase.storage.from("signatures").getPublicUrl(fileName);
          storageUrl = publicUrlData.publicUrl;
      } catch(e) {
          console.warn("Storage failed/unconfigured, defaulting to base64 inline", e);
          storageUrl = signatureDataUrl; // fallback
      }

      // 2. Insert to commitments table
      const { error: dbError } = await supabase.from("commitments").insert({
        nama_sekolah: form.sekolah,
        penanggung_jawab: form.penanggungJawab,
        signature_url: storageUrl
      });
      if (dbError) throw dbError;

      // 3. Update schools table status
      const { data: updatedSchool } = await supabase
        .from("schools")
        .update({ status: "komitmen" })
        .eq("nama_sekolah", form.sekolah)
        .select();

      // 4. Generate & Download PDF Locally
      generateKomitmenPDF(form.sekolah, form.penanggungJawab, signatureDataUrl);

      setSuccess(true);
      setTimeout(() => {
        router.push(`/peta?schoolId=${updatedSchool?.[0]?.id || ''}`);
      }, 3500);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan. Pastikan database dan storage Supabase sudah dikonfigurasi.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 animate-pulse" />
        <h2 className="text-3xl font-bold text-kominfo-navy mb-4">Komitmen Berhasil Disahkan!</h2>
        <p className="text-gray-600 max-w-lg mb-8">
          Sertifikat PDF komitmen digital Anda telah diunduh. Terima kasih atas partisipasi aktif {form.sekolah} dalam menjaga ekosistem pendidikan digital.
        </p>
        <Button onClick={() => window.location.href = "/peta"} className="flex items-center gap-2">
          <Download className="w-4 h-4" /> Buka Peta Partisipasi
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <JourneyBar />
      <div className="text-center mb-10">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-kominfo-blue mb-4">
          <PenTool className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-kominfo-navy mb-4">Kontrak Komitmen Bersama</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tunjukkan dedikasi nyata sekolah Anda melalui penandatanganan digital untuk pedoman pemakaian gadget yang sehat.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Policy Notice Form */}
        <Card className="p-8 bg-gradient-to-b from-blue-50 to-white">
          <h3 className="font-bold text-xl text-kominfo-navy mb-4">5 Pilar Komitmen</h3>
          <ul className="text-sm text-gray-700 space-y-4 mb-6">
            <li className="flex gap-2">
              <span className="font-bold text-kominfo-blue">1.</span>
              Memastikan perangkat digital digunakan khusus untuk menunjang pendidikan.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-kominfo-blue">2.</span>
              Menetapkan aturan tegas batasan waktu akses gawai di area sekolah.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-kominfo-blue">3.</span>
              Mensosialisasikan bahaya cyberbullying & dampaknya pada kesehatan mental.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-kominfo-blue">4.</span>
              Memberikan ruang diskusi literasi dan etika digital bagi siswa.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-kominfo-blue">5.</span>
              Melibatkan orang tua dalam memantau gadget anak di rumah.
            </li>
          </ul>
        </Card>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Sekolah <span className="text-red-500">*</span>
              </label>
              <SchoolAutocomplete 
                value={form.sekolah} 
                onChange={(val, school) => {
                  setForm(prev => ({ ...prev, sekolah: val }));
                  setSelectedSchoolStatus(school ? school.status : null);
                }} 
                placeholder="Cari sekolah (SMAN 1 Jakarta)"
              />
              
              {isLocked && (
                <div className="mt-4 p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-sm flex flex-col items-start gap-2 animate-in fade-in slide-in-from-top-2">
                  <p><strong>Akses Terkunci:</strong> Sekolah &quot;{form.sekolah}&quot; belum menyelesaikan tahap Survei Diagnostik. Anda tidak dapat melompati langkah.</p>
                  <Button type="button" onClick={() => window.location.href='/survei'} variant="outline" className="bg-white hover:bg-orange-100 border-orange-300 text-orange-700 mt-2">
                    Kembali ke Langkah 1 (Survei)
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Penanggung Jawab <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                value={form.penanggungJawab}
                onChange={e => setForm({ ...form, penanggungJawab: e.target.value })}
                className="w-full rounded-xl border-gray-300 px-4 py-3 border outline-none focus:border-kominfo-blue"
                placeholder="Cth: Bpk. Budi Santoso, S.Pd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tanda Tangan Digital <span className="text-red-500">*</span></label>
              <div className={`border border-gray-300 rounded-xl overflow-hidden relative ${isLocked ? 'bg-gray-100 opacity-50 cursor-not-allowed' : 'bg-gray-50'}`}>
                {isLocked && <div className="absolute inset-0 z-10" title="Selesaikan langkah 1 terlebih dahulu" />}
                <SignatureCanvas  
                  ref={sigCanvas}
                  canvasProps={{ className: "w-full h-40 cursor-crosshair" }}
                />
                <button 
                  type="button" 
                  onClick={clearSignature}
                  className="absolute bottom-2 right-2 text-xs flex items-center gap-1 bg-white p-1.5 rounded-md shadow-sm border border-gray-200 text-gray-500 hover:text-red-500"
                >
                  <RefreshCw className="w-3 h-3" /> Ulangi
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading || isLocked || form.sekolah.length === 0}>
              {loading ? "Menyimpan & Mengunduh PDF..." : "Sahkan & Unduh Sertifikat PDF"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
