"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Activity, CheckCircle2 } from "lucide-react";
import { JourneyBar } from "@/components/JourneyBar";
import { SchoolAutocomplete } from "@/components/SchoolAutocomplete";

export default function SurveiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    nama: "",
    namaSekolah: "",
    q1: "",
    q2: "",
    q3: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Insert to survey_results
      const { error: surveyError } = await supabase.from("survey_results").insert({
        nama: form.nama || "Anonim",
        nama_sekolah: form.namaSekolah,
        jawaban: { q1: form.q1, q2: form.q2, q3: form.q3 }
      });

      if (surveyError) throw surveyError;

      // 2. Insert or update school in schools
      const { data: existingSchools } = await supabase
        .from("schools")
        .select("id, status")
        .eq("nama_sekolah", form.namaSekolah);

      if (!existingSchools || existingSchools.length === 0) {
        // Create new
        const { data: newSchool } = await supabase.from("schools").insert({
          nama_sekolah: form.namaSekolah,
          latitude: -2.5489 + (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5, // random coordinate in Indo
          longitude: 118.0149 + (Math.random() < 0.5 ? -1 : 1) * Math.random() * 10,
          status: "survei"
        }).select();
        
        setSuccess(true);
        setTimeout(() => {
          router.push(`/peta?schoolId=${newSchool?.[0]?.id || ''}`);
        }, 3000);
      } else {
        const school = existingSchools[0];
        // Only update if it's "belum", DO NOT downgrade "komitmen"
        if (school.status === "belum") {
          await supabase.from("schools").update({ status: "survei" }).eq("id", school.id);
        }
        setSuccess(true);
        setTimeout(() => {
          router.push(`/peta?schoolId=${school.id}`);
        }, 3000);
      }

    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Terjadi kesalahan saat mengirim hasil survei. Pastikan Anda telah mengonfigurasi database.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 animate-bounce" />
        <h2 className="text-3xl font-bold text-kominfo-navy mb-4 text-center">Terima Kasih!</h2>
        <p className="text-gray-600 text-center max-w-md">
          Survei Anda telah berhasil dikirimkan. Kami akan mengarahkan Anda ke Peta Partisipasi untuk melihat posisi sekolah Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JourneyBar />
      <div className="mb-10 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-kominfo-blue mb-4">
          <Activity className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-kominfo-navy mb-4">Survei Evaluasi Digital</h1>
        <p className="text-gray-600">
          Mari berpartisipasi memajukan literasi digital. Jawaban Anda membantu kami memetakan indeks kesiapan ekosistem pendidikan digital.
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-kominfo-navy border-b pb-2">Data Diri (Opsional)</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Masukkan nama Anda (Boleh dikosongkan)"
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-kominfo-blue focus:ring-kominfo-blue px-4 py-3 border outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah <span className="text-red-500">*</span></label>
              <SchoolAutocomplete 
                value={form.namaSekolah} 
                onChange={(val) => setForm(prev => ({ ...prev, namaSekolah: val }))} 
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-kominfo-navy border-b pb-2">Pertanyaan Evaluasi</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">1. Berapa lama rata-rata penggunaan gadget murni untuk hiburan di sekolah? <span className="text-red-500">*</span></label>
              <select name="q1" required value={form.q1} onChange={handleChange} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-kominfo-blue focus:ring-kominfo-blue px-4 py-3 border outline-none bg-white">
                <option value="">Pilih jawaban...</option>
                <option value="< 1 jam">&lt; 1 jam</option>
                <option value="1 - 3 jam">1 - 3 jam</option>
                <option value="> 3 jam">&gt; 3 jam</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">2. Apakah di sekolah ada aturan tertulis penggunaan HP? <span className="text-red-500">*</span></label>
              <select name="q2" required value={form.q2} onChange={handleChange} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-kominfo-blue focus:ring-kominfo-blue px-4 py-3 border outline-none bg-white">
                <option value="">Pilih jawaban...</option>
                <option value="Ya, sangat ketat">Ya, sangat ketat diterapkan</option>
                <option value="Ada, tapi tidak tegas">Ada, tapi kurang diterapkan</option>
                <option value="Tidak ada">Tidak ada sama sekali</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">3. Bagaimana dampak regulasi gadget terhadap kualitas belajar? <span className="text-red-500">*</span></label>
              <select name="q3" required value={form.q3} onChange={handleChange} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-kominfo-blue focus:ring-kominfo-blue px-4 py-3 border outline-none bg-white">
                <option value="">Pilih jawaban...</option>
                <option value="Sangat Membantu">Sangat membantu konsentrasi</option>
                <option value="Biasa Saja">Biasa saja / Netral</option>
                <option value="Mengganggu">Keterbatasan akses info justru mengganggu</option>
              </select>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Mengirim Data..." : "Kirim Survei"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
