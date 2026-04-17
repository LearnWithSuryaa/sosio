import { Smartphone, ShieldAlert, Users, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";

const problems = [
  {
    icon: Smartphone,
    title: "Penyalahgunaan Gadget",
    description:
      "Lebih dari 70% siswa menggunakan smartphone untuk hiburan selama jam pelajaran, bukan untuk belajar.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: ShieldAlert,
    title: "Literasi Digital Rendah",
    description:
      "Sebagian besar siswa tidak mampu membedakan informasi valid dari hoaks, meningkatkan risiko misinformasi.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Users,
    title: "Minimnya Kolaborasi Antar-Sekolah",
    description:
      "Sekolah menangani masalah digital secara terisolasi, tanpa best-practice dari institusi lain.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: AlertTriangle,
    title: "Ancaman Cyberbullying",
    description:
      "Kasus perundungan digital meningkat tajam tanpa adanya sistem pelaporan maupun edukasi preventif.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 px-4 bg-gray-50/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold text-red-600 bg-red-50 rounded-full uppercase tracking-wider mb-4">
            Permasalahan
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-kominfo-navy mb-4">
            Tantangan Penggunaan Gadget di Lingkungan Sekolah
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Berbagai permasalahan nyata yang dihadapi ekosistem pendidikan
            Indonesia saat ini akibat kurangnya regulasi dan kesadaran digital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item) => (
            <Card
              key={item.title}
              className="p-6 hover:-translate-y-1 transition-all duration-300 border-transparent hover:border-gray-200 group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-kominfo-navy mb-2 text-lg">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
