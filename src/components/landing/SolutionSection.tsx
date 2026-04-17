import { Activity, Map, ShieldCheck, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: Activity,
    title: "Survei Diagnostik",
    description:
      "Evaluasi anonim penggunaan gadget di lingkungan sekolah untuk memetakan tingkat kesiapan digital.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Map,
    title: "Peta Partisipasi",
    description:
      "Visualisasi real-time sebaran sekolah yang telah berkontribusi dalam gerakan sadar digital nasional.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Komitmen Digital",
    description:
      "Penandatanganan kontrak digital resmi dengan sertifikat PDF sebagai bukti tanggung jawab bersama.",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: BookOpen,
    title: "Studi Kasus",
    description:
      "Kumpulan praktik terbaik dari sekolah-sekolah yang berhasil mengelola ekosistem digital secara efektif.",
    gradient: "from-amber-500 to-amber-600",
  },
];

export function SolutionSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold text-kominfo-blue bg-blue-50 rounded-full uppercase tracking-wider mb-4">
            Solusi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-kominfo-navy mb-4">
            Solusi Kolaboratif Berbasis Partisipasi
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Empat pilar utama yang menjadi fondasi platform ini dalam membangun
            ekosistem pendidikan digital yang lebih sehat dan terukur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Gradient accent top */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`}
              />
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-kominfo-navy mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
