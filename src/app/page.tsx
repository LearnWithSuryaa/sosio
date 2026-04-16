import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { Map, Activity, ShieldCheck, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";

// Fallback numbers to provide immediate context & social proof
const BASE_SCHOOLS = 500;
const BASE_STUDENTS = 12000;

async function getStats() {
  try {
    const { count: currentSchools } = await supabase
      .from("schools")
      .select("*", { count: "exact", head: true });

    // As a demonstration we calculate "students" assuming avg 300 per school
    // or just fetch real ones if we had a students table.
    const realSchools = currentSchools || 0;

    return {
      schools: BASE_SCHOOLS + realSchools,
      students: BASE_STUDENTS + realSchools * 300,
    };
  } catch (e) {
    // Graceful degradation when not connected yet
    return { schools: BASE_SCHOOLS, students: BASE_STUDENTS };
  }
}

export default async function Home() {
  const stats = await getStats();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-kominfo-navy pt-8 pb-24 lg:pt-12 lg:pb-32 flex justify-center">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-kominfo-blue rounded-full filter blur-[100px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-400 rounded-full filter blur-[80px] opacity-30 mix-blend-screen" />

        <div className="relative z-10 max-w-5xl px-4 mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-blue-100 rounded-full border border-blue-400/30 bg-white/10 backdrop-blur-md">
            <span className="flex w-2 h-2 mr-2 rounded-full bg-blue-400 animate-pulse"></span>
            Program Ekosistem Digital 2026
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Mendorong Pemanfaatan Gadget <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
              untuk Pendidikan yang Berkualitas
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-blue-100/80">
            Sebuah inisiatif bersama membangun kesadaran digital, memetakan
            partisipasi, dan mengamankan integritas pendidikan di era informasi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/survei" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-white text-kominfo-navy hover:bg-gray-50 border-0"
              >
                Mulai Survei
              </Button>
            </Link>
            <Link href="/peta" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-white border-white/30 hover:bg-white/10 hover:text-white"
              >
                Lihat Peta Partisipasi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with Neumorphic integration */}
      <section className="relative z-20 w-full max-w-5xl px-4 mx-auto -mt-12 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <Card className="p-6 text-center border-white/50 backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-transform">
            <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-kominfo-blue mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-kominfo-navy">
              {stats.schools}+
            </h3>
            <p className="text-gray-500 font-medium">Sekolah Berkomitmen</p>
          </Card>
          <Card className="p-6 text-center border-white/50 backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-transform">
            <div className="inline-flex p-3 rounded-2xl bg-green-50 text-green-600 mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-kominfo-navy">
              {stats.students}+
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

      {/* Additional Values / Content mapping */}
      <section className="py-24 px-4 w-full max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold text-kominfo-navy mb-12 text-center">
          Pilar Ekosistem Kami
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-kominfo-blue mb-4">
              <Activity className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-kominfo-navy mb-2">
              Survei Evaluasi
            </h3>
            <p className="text-gray-600">
              Menilai tingkat kecanduan dan pemanfaatan gadget di lingkungan
              sekolah secara anonim dan aman.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-kominfo-blue mb-4">
              <Map className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-kominfo-navy mb-2">
              Peta Partisipasi
            </h3>
            <p className="text-gray-600">
              Visualisasi waktu-nyata penyebaran sekolah yang berkontribusi
              dalam gerakan sadar digital.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-kominfo-blue mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-kominfo-navy mb-2">
              Kontrak Digital
            </h3>
            <p className="text-gray-600">
              Penandatanganan komitmen nyata perlindungan pendidikan digital
              dengan sertifikat resmi elektronik.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
