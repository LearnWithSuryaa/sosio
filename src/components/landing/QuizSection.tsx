import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Brain, ArrowRight } from "lucide-react";

export function QuizSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-0 overflow-hidden border-0 shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left side - Visual */}
            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-10 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-3xl font-extrabold mb-3 leading-tight">
                  Seberapa Bijak Kamu Menggunakan Gadget?
                </h3>
                <p className="text-purple-100/80 leading-relaxed">
                  5 pertanyaan refleksi singkat untuk mengetahui profil kebiasaan
                  digital Anda. Tanpa penilaian, hanya untuk kesadaran diri.
                </p>
              </div>
            </div>

            {/* Right side - CTA */}
            <div className="p-10 flex flex-col justify-center bg-white">
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 text-sm font-bold">
                    ✓
                  </span>
                  <p className="text-gray-600 text-sm">
                    Hanya membutuhkan waktu <strong>2 menit</strong> untuk diselesaikan
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 text-sm font-bold">
                    ✓
                  </span>
                  <p className="text-gray-600 text-sm">
                    Mendapatkan <strong>profil kebiasaan digital</strong> dan saran personal
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 text-sm font-bold">
                    ✓
                  </span>
                  <p className="text-gray-600 text-sm">
                    <strong>100% anonim</strong> — tidak ada data pribadi yang disimpan
                  </p>
                </div>
              </div>

              <Link href="/kuis">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 gap-2 font-bold"
                >
                  Mulai Refleksi <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
