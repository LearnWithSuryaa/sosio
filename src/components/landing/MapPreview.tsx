import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Info } from "lucide-react";

export function MapPreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full uppercase tracking-wider mb-4">
            Social Proof
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-kominfo-navy mb-4">
            Peta Partisipasi Nasional
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Lihat sebaran sekolah di seluruh Indonesia yang telah bergabung
            dalam gerakan ekosistem digital.
          </p>
        </div>

        {/* Map Placeholder with realistic styling */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="w-full h-[400px] bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/118.0,-2.5,4,0/1200x400@2x?access_token=placeholder')] bg-cover bg-center bg-gray-100 flex items-center justify-center relative">
            {/* Simulated map overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

            {/* Simulated markers */}
            <div className="absolute top-[30%] left-[35%] w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/30 animate-pulse" />
            <div className="absolute top-[40%] left-[45%] w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/30" />
            <div className="absolute top-[35%] left-[50%] w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/30 animate-pulse" />
            <div className="absolute top-[45%] left-[38%] w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/30" />
            <div className="absolute top-[50%] left-[55%] w-4 h-4 rounded-full bg-gray-400 shadow-lg shadow-gray-400/30" />
            <div className="absolute top-[25%] left-[42%] w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/30" />
            <div className="absolute top-[55%] left-[60%] w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/30 animate-pulse" />

            {/* Center label */}
            <div className="relative z-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-gray-100 text-center">
              <p className="text-kominfo-navy font-bold text-lg mb-1">
                Peta Interaktif Tersedia
              </p>
              <p className="text-gray-500 text-sm mb-3">
                Klik untuk melihat peta lengkap dengan data real-time
              </p>
              <Link href="/peta">
                <Button size="sm" className="px-6">
                  Buka Peta Lengkap
                </Button>
              </Link>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm">
              <Info className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 font-medium">Keterangan:</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
              <span className="text-gray-600">Sudah Komitmen</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm" />
              <span className="text-gray-600">Sudah Survei</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-gray-400 shadow-sm" />
              <span className="text-gray-600">Belum Ikut</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
