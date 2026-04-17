import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-kominfo-navy via-[#0e4a73] to-kominfo-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/15 rounded-full filter blur-[100px]" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Mari Berpartisipasi Membangun{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
            Ekosistem Digital yang Lebih Baik
          </span>
        </h2>

        <p className="text-blue-100/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Setiap sekolah yang berpartisipasi membawa Indonesia selangkah lebih
          dekat menuju pendidikan digital yang aman, terukur, dan berkualitas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/survei">
            <Button
              size="lg"
              className="bg-white text-kominfo-navy hover:bg-gray-50 border-0 font-bold text-base px-10 gap-2"
            >
              Mulai Survei Sekarang <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/peta">
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white/30 hover:bg-white/10 hover:text-white font-medium px-8"
            >
              Lihat Peta Partisipasi
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
