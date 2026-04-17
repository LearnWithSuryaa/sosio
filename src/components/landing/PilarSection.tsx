import { Activity, Map, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Activity,
    title: "Survei Evaluasi",
    description:
      "Menilai tingkat kecanduan dan pemanfaatan gadget di lingkungan sekolah secara anonim dan aman.",
  },
  {
    icon: Map,
    title: "Peta Partisipasi",
    description:
      "Visualisasi waktu-nyata penyebaran sekolah yang berkontribusi dalam gerakan sadar digital.",
  },
  {
    icon: ShieldCheck,
    title: "Kontrak Digital",
    description:
      "Penandatanganan komitmen nyata perlindungan pendidikan digital dengan sertifikat resmi elektronik.",
  },
];

export function PilarSection() {
  return (
    <section className="py-24 px-4 w-full max-w-6xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold text-kominfo-navy mb-12 text-center">
        Pilar Ekosistem Kami
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-kominfo-blue mb-4">
              <pillar.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-kominfo-navy mb-2">
              {pillar.title}
            </h3>
            <p className="text-gray-600">{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
