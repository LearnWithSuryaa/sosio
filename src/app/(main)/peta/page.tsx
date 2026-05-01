"use client";

import nextDynamic from "next/dynamic";
import { Map, Info, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { JourneyBar } from "@/components/JourneyBar";
import { TourGuide } from "@/components/TourGuide";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

// Dynamically import Leaflet map, disable SSR
const PetaMap = nextDynamic(() => import("@/components/PetaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-50 rounded-2xl flex items-center justify-center animate-pulse border border-gray-200 shadow-inner">
      <span className="text-gray-400 font-semibold flex items-center gap-2">
        <Map className="w-5 h-5 animate-bounce" /> Memuat Peta Nusantara...
      </span>
    </div>
  ),
});

function PetaContent() {
  const searchParams = useSearchParams();
  const schoolId = searchParams.get("schoolId");
  return <PetaMap schoolId={schoolId || undefined} />;
}

function PetaPageContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from"); // survei | komitmen | null
  const [counts, setCounts] = useState({ total: 0, komitmen: 0 });

  useEffect(() => {
    async function getCounts() {
      const [{ count: t }, { count: k }] = await Promise.all([
        supabase.from("schools").select("*", { count: "exact", head: true }),
        supabase.from("schools").select("*", { count: "exact", head: true }).eq("status", "komitmen"),
      ]);
      setCounts({ total: t || 0, komitmen: k || 0 });
    }
    getCounts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
      {/* Cerdas: Hanya tampilkan JourneyBar jika pengunjung sedang dalam proses flow partisipasi (from=survei / from=komitmen) */}
      {(from === "survei" || from === "komitmen") && <JourneyBar />}

      {/* Alert redirect success */}
      {from === "survei" && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center gap-3 animate-success text-emerald-800 text-center">
          <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            ✓
          </span>
          <p className="font-medium">
            Data survei berhasil disimpan. Posisi sekolah Anda kini terlihat di
            peta.
          </p>
        </div>
      )}

      {from === "komitmen" && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center gap-3 animate-success text-emerald-800 text-center">
          <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            ✓
          </span>
          <p className="font-medium">
            Sertifikat berhasil disahkan. Sekolah Anda resmi berstatus komitmen.
          </p>
        </div>
      )}

      <div
        id="tour-peta-header"
        className="mb-10 text-center flex flex-col items-center animate-success"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="inline-flex p-4 rounded-3xl bg-amber-50 text-amber-500 mb-6 shadow-sm border border-amber-100">
          <Map className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Peta Partisipasi Nasional
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
          Lihat distribusi komitmen pemanfaatan gadget sehat dari
          sekolah-sekolah di seluruh Nusantara.
        </p>
      </div>

      <div
        id="tour-peta-map-section"
        className="relative animate-success"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative z-10 bg-white p-1 pb-0">
          <Suspense
            fallback={
              <div className="w-full h-[600px] bg-gray-50 border border-gray-200 animate-pulse rounded-2xl" />
            }
          >
            <PetaContent />
          </Suspense>
        </div>

        {/* Floating Legend */}
        <div
          id="tour-peta-legend"
          className="md:absolute md:top-6 md:right-6 z-[999] bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-100 w-full md:w-64 mt-4 md:mt-0"
        >
          <h4 className="flex items-center gap-2 font-black text-gray-900 border-b border-gray-100 pb-3 mb-4 text-sm uppercase tracking-wider">
            <Info className="w-4 h-4 text-orange-500" /> Indikator Status
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/50">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm block ring-4 ring-emerald-50"></span>
                <span className="text-gray-800 font-bold">Komitmen</span>
              </div>
              <span className="text-xs font-bold text-emerald-600">
                {counts.komitmen > 0 ? counts.komitmen : "-"}
              </span>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-amber-400 shadow-sm block ring-4 ring-amber-50"></span>
                <span className="text-gray-700 font-semibold">
                  Sudah Survei
                </span>
              </div>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-gray-300 shadow-sm block ring-4 ring-gray-50"></span>
                <span className="text-gray-600 font-medium">Belum Ikut</span>
              </div>
              <span className="text-xs font-semibold text-gray-400">
                {counts.total > 0 ? counts.total : "-"}
              </span>
            </li>
          </ul>
        </div>

        {/* CTA Strip under Map */}
        {from !== "komitmen" && (
          <div
            id="tour-peta-cta"
            className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Sudah melihat posisi sekolah Anda?
              </h3>
              <p className="text-gray-600 font-medium">
                Langkah selanjutnya adalah mengesahkan komitmen digital.
              </p>
            </div>
            <Link href="/komitmen" className="relative z-10 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/20 px-8 py-6 text-base flex items-center justify-center gap-2"
              >
                Lanjut ke Komitmen <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      <TourGuide
        pageName="Peta"
        steps={[
          {
            element: "#tour-journey-bar",
            popover: {
              title: "Jejak Langkah",
              description:
                "Lihat dimana Anda berada dari keseluruhan 3 langkah partisipasi ekosistem.",
            },
          },
          {
            element: "#tour-peta-header",
            popover: {
              title: "Papan Partisipasi Nasional",
              description:
                "Ini adalah halaman titik temu bagi sekolah-sekolah di seluruh Nusantara.",
            },
          },
          {
            element: "#tour-peta-map-section",
            popover: {
              title: "Peta Persebaran",
              description:
                "Lokasi merah menunjukkan instansi yang telah mencapai ranah ekosistem digital penuh.",
            },
          },
          {
            element: "#tour-peta-legend",
            popover: {
              title: "Label Status",
              description:
                "Perhatikan indikator warna ini untuk memahami pemosisian setiap titik wilayah.",
            },
          },
          {
            element: "#tour-peta-cta",
            popover: {
              title: "Langkah Terakhir",
              description:
                "Setelah melihat Peta, klik tombol di sini untuk melegalkan pengesahan komitmen.",
            },
          },
        ]}
      />
    </div>
  );
}

export default function PetaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 text-center text-gray-500 font-medium">
          Memuat halaman Peta...
        </div>
      }
    >
      <PetaPageContent />
    </Suspense>
  );
}

