import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-kominfo-navy pt-8 pb-28 lg:pt-14 lg:pb-36 flex justify-center">
      {/* Abstract Background Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-kominfo-blue rounded-full filter blur-[100px] opacity-40 mix-blend-screen" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-400 rounded-full filter blur-[80px] opacity-30 mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full filter blur-[120px]" />

      <div className="relative z-10 max-w-5xl px-4 mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-1.5 mb-8 text-sm font-medium text-blue-100 rounded-full border border-blue-400/30 bg-white/10 backdrop-blur-md">
          <span className="flex w-2 h-2 mr-2 rounded-full bg-blue-400 animate-pulse" />
          Program Ekosistem Digital 2026
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Mendorong Pemanfaatan Gadget{" "}
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-white">
            untuk Pendidikan yang Lebih Berkualitas
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-blue-100/80 leading-relaxed">
          Platform partisipasi nasional untuk membangun kesadaran digital,
          memetakan kontribusi sekolah, dan melindungi integritas pendidikan
          di era informasi.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link href="/survei" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full bg-white text-kominfo-navy hover:bg-gray-50 border-0 font-bold text-base px-8"
            >
              Mulai Survei Sekarang
            </Button>
          </Link>
          <Link href="/peta" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full text-white border-white/30 hover:bg-white/10 hover:text-white font-medium text-base px-8"
            >
              Lihat Peta Partisipasi
            </Button>
          </Link>
        </div>

        {/* Inline Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-blue-300" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-extrabold text-white">500+</p>
              <p className="text-sm text-blue-200/70">Sekolah Terdaftar</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/20" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <Users className="w-6 h-6 text-blue-300" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-extrabold text-white">12.000+</p>
              <p className="text-sm text-blue-200/70">Siswa Terdampak</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
