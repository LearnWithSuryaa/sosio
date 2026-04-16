"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/Card";
import { BookOpen, Quote } from "lucide-react";

export default function StudiKasusPage() {
  const [cases, setCases] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    async function fetchCases() {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setCases(data);
      } else {
        // Fallback mockup items to ensure it has UI out of the box when empty DB
        setCases([
          {
            id: 1,
            judul: "Penerapan Loker HP Saat Jam KBM",
            sekolah: "SMAN 3 Bandung",
            penulis: "Kepala Sekolah SMAN 3",
            isi: "Menerapkan sistem loker hp setiap awal kelas. Awalnya siswa keberatan, namun dalam 3 bulan fokus belajar meningkat 40%.",
          },
          {
            id: 2,
            judul: "Duta Digital Sebaya",
            sekolah: "SMPN 1 Surabaya",
            penulis: "Guru BK",
            isi: "Siswa yang memahami literasi digital dipilih sebagai duta sebaya untuk mengedukasi teman-temannya menghindari cyberbullying.",
          }
        ]);
      }
    }
    fetchCases();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center text-kominfo-navy">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-kominfo-blue mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Studi Kasus & Praktik Baik</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Belajar dari pendekatan inovatif sekolah-sekolah di Indonesia yang sukses meminimalisir dampak negatif serta memaksimalkan dampak positif gadget.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((cs) => (
          <Card key={cs.id} className="p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-kominfo-blue group-hover:scale-110 transition-transform">
              <Quote className="w-16 h-16" />
            </div>
            
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4">
              Best Practice
            </span>
            
            <h3 className="text-xl font-bold text-kominfo-navy mb-2 line-clamp-2">
              {cs.judul}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 border-b pb-4">
              <span className="font-medium text-kominfo-blue">{cs.sekolah}</span>
              <span>•</span>
              <span>{cs.penulis}</span>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm">
              &quot;{cs.isi}&quot;
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
