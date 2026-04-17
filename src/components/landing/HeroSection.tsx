import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
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
  );
}
