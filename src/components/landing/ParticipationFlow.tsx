import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ClipboardList, MapPin, Handshake, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Isi Survei Evaluasi",
    description:
      "Lengkapi survei anonim tentang pola penggunaan gadget di sekolah Anda. Proses hanya 2 menit.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Temukan Sekolah di Peta",
    description:
      "Sekolah Anda langsung muncul di peta partisipasi nasional sebagai bukti kontribusi nyata.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Buat Komitmen Bersama",
    description:
      "Sahkan kontrak digital dan dapatkan sertifikat resmi sebagai bentuk dedikasi kolektif.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Lihat Dampak Partisipasi",
    description:
      "Pantau perkembangan gerakan nasional dan pelajari bagaimana sekolah lain meraih keberhasilan.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
];

export function ParticipationFlow() {
  return (
    <section className="py-20 px-4 bg-gray-50/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold text-kominfo-blue bg-blue-50 rounded-full uppercase tracking-wider mb-4">
            Alur Partisipasi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-kominfo-navy mb-4">
            Bagaimana Cara Berpartisipasi?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Hanya 4 langkah sederhana untuk menjadikan sekolah Anda bagian dari
            gerakan sadar digital nasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div key={item.step} className="relative flex flex-col items-center">
              {/* Connector Line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] z-0">
                  <div className="border-t-2 border-dashed border-gray-300" />
                  <ArrowRight className="absolute -right-3 -top-2.5 w-5 h-5 text-gray-300" />
                </div>
              )}

              <div
                className={`relative z-10 w-20 h-20 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-5 border-2 ${item.border}`}
              >
                <item.icon className="w-8 h-8" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-kominfo-navy text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {item.step}
                </span>
              </div>

              <h3 className="font-bold text-kominfo-navy mb-2 text-center text-lg">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed text-center max-w-[250px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/survei">
            <Button size="lg" className="px-10 font-bold text-base">
              Mulai Langkah Pertama
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
