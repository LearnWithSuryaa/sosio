"use client";

import dynamic from "next/dynamic";
import { Map, Info } from "lucide-react";

// Dynamically import Leaflet map, disable SSR
const PetaMap = dynamic(() => import("@/components/PetaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center animate-pulse border border-gray-200">
      <span className="text-gray-400 font-medium tracking-wide">Memuat Peta...</span>
    </div>
  )
});

export default function PetaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 text-center flex flex-col items-center">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-kominfo-blue mb-4">
          <Map className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-kominfo-navy mb-4">Peta Partisipasi Nasional</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lihat distribusi komitmen pemanfaatan gadget sehat dari sekolah-sekolah di seluruh Nusantara.
        </p>
      </div>

      <div className="relative">
        <PetaMap />
        
        {/* Floating Legend */}
        <div className="md:absolute top-4 right-4 z-[999] bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 w-full md:w-auto mt-4 md:mt-0">
          <h4 className="flex items-center gap-2 font-bold text-kominfo-navy border-b pb-2 mb-3 text-sm">
            <Info className="w-4 h-4" /> Keterangan
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-green-500 shadow-sm block"></span>
              <span className="text-gray-700 font-medium">Sudah Komitmen</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-yellow-400 shadow-sm block"></span>
              <span className="text-gray-700 font-medium">Sudah Survei</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-gray-400 shadow-sm block"></span>
              <span className="text-gray-700 font-medium">Belum Ikut</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
