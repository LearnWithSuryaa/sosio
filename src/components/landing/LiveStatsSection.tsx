import { Card } from "@/components/ui/Card";
import { School, Handshake, TrendingUp } from "lucide-react";

interface LiveStatsSectionProps {
  schools: number;
  commitments: number;
}

export function LiveStatsSection({ schools, commitments }: LiveStatsSectionProps) {
  const participationRate = schools > 0 ? Math.round((commitments / schools) * 100) : 0;

  return (
    <section className="py-20 px-4 bg-kominfo-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-kominfo-blue rounded-full filter blur-[100px] opacity-30" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-400 rounded-full filter blur-[80px] opacity-20" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold text-blue-200 bg-white/10 rounded-full uppercase tracking-wider mb-4 backdrop-blur-md border border-white/10">
            Data Real-Time
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Statistik Partisipasi Terkini
          </h2>
          <p className="text-blue-200/70 max-w-xl mx-auto">
            Data langsung dari sistem kami, diperbarui secara otomatis setiap
            kali sekolah baru berpartisipasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 text-center bg-white/10 backdrop-blur-lg border-white/10 hover:-translate-y-1 transition-all">
            <div className="inline-flex p-3 rounded-2xl bg-blue-400/20 text-blue-300 mb-4">
              <School className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-extrabold text-white mb-1">
              {schools.toLocaleString("id-ID")}+
            </h3>
            <p className="text-blue-200/70 font-medium">Sekolah Terdaftar</p>
          </Card>

          <Card className="p-8 text-center bg-white/10 backdrop-blur-lg border-white/10 hover:-translate-y-1 transition-all">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-400/20 text-emerald-300 mb-4">
              <Handshake className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-extrabold text-white mb-1">
              {commitments.toLocaleString("id-ID")}+
            </h3>
            <p className="text-blue-200/70 font-medium">Komitmen Tersahkan</p>
          </Card>

          <Card className="p-8 text-center bg-white/10 backdrop-blur-lg border-white/10 hover:-translate-y-1 transition-all">
            <div className="inline-flex p-3 rounded-2xl bg-amber-400/20 text-amber-300 mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-extrabold text-white mb-1">
              {participationRate}%
            </h3>
            <p className="text-blue-200/70 font-medium">Rasio Partisipasi</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
