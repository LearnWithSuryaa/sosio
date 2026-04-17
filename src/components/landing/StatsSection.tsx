import { Card } from "@/components/ui/Card";
import { ShieldCheck, Users, Activity } from "lucide-react";

interface StatsSectionProps {
  schools: number;
  students: number;
}

export function StatsSection({ schools, students }: StatsSectionProps) {
  return (
    <section className="relative z-20 w-full max-w-5xl px-4 mx-auto -mt-12 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="p-6 text-center border-white/50 backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-transform">
          <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-kominfo-blue mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold text-kominfo-navy">
            {schools}+
          </h3>
          <p className="text-gray-500 font-medium">Sekolah Berkomitmen</p>
        </Card>
        <Card className="p-6 text-center border-white/50 backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-transform">
          <div className="inline-flex p-3 rounded-2xl bg-green-50 text-green-600 mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold text-kominfo-navy">
            {students}+
          </h3>
          <p className="text-gray-500 font-medium">Siswa Terdampak</p>
        </Card>
        <Card className="p-6 text-center border-white/50 backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-transform bg-gradient-to-br from-kominfo-navy to-kominfo-blue text-white">
          <div className="inline-flex p-3 rounded-2xl bg-white/20 text-white mb-4">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold text-white">100%</h3>
          <p className="text-blue-100 font-medium">Transparansi Data</p>
        </Card>
      </div>
    </section>
  );
}
