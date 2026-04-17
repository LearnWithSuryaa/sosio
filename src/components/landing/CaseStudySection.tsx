import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Quote, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    title: "Penerapan Loker HP Saat Jam KBM",
    school: "SMAN 3 Bandung",
    story:
      "Menerapkan sistem loker HP di setiap awal kelas. Awalnya siswa keberatan, namun dalam 3 bulan fokus belajar meningkat 40% dan nilai ujian naik signifikan.",
    quote: "Disiplin digital dimulai dari hal kecil yang konsisten.",
    tag: "Kebijakan Sekolah",
  },
  {
    title: "Duta Digital Sebaya",
    school: "SMPN 1 Surabaya",
    story:
      "Siswa yang memahami literasi digital dipilih sebagai duta sebaya untuk mengedukasi teman-temannya menghindari cyberbullying dan konten negatif.",
    quote: "Edukasi terbaik datang dari teman sebaya yang dipercaya.",
    tag: "Peer Education",
  },
  {
    title: "Jam Gadget Terjadwal",
    school: "SMPN 5 Yogyakarta",
    story:
      "Mengalokasikan 30 menit sebelum dan sesudah jam pelajaran sebagai 'jam gadget bebas', sementara jam efektif belajar bebas dari distraksi digital.",
    quote: "Bukan melarang, tapi mengajarkan kontrol diri.",
    tag: "Manajemen Waktu",
  },
];

export function CaseStudySection() {
  return (
    <section className="py-20 px-4 bg-gray-50/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full uppercase tracking-wider mb-4">
            Inspirasi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-kominfo-navy mb-4">
            Praktik Baik dari Sekolah Lain
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Pelajari pendekatan inovatif yang telah terbukti berhasil dalam
            mengelola penggunaan gadget di lingkungan sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <Card
              key={cs.title}
              className="p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote watermark */}
              <div className="absolute top-0 right-0 p-4 opacity-5 text-kominfo-blue group-hover:scale-110 transition-transform">
                <Quote className="w-20 h-20" />
              </div>

              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-4">
                {cs.tag}
              </span>

              <h3 className="text-xl font-bold text-kominfo-navy mb-1 line-clamp-2">
                {cs.title}
              </h3>
              <p className="text-sm text-kominfo-blue font-semibold mb-4">
                {cs.school}
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                {cs.story}
              </p>

              <blockquote className="border-l-3 border-kominfo-blue pl-4 italic text-sm text-gray-600 bg-blue-50/50 py-2 px-3 rounded-r-lg">
                &quot;{cs.quote}&quot;
              </blockquote>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/studi-kasus">
            <Button variant="outline" className="px-8 gap-2">
              Lihat Semua Studi Kasus <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
