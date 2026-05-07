"use client";

import nextDynamic from "next/dynamic";
import {
  MapPin,
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Globe2,
  Flame,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { JourneyBar } from "@/components/JourneyBar";
import { TourGuide } from "@/components/TourGuide";
import Link from "next/link";

const PetaMap = nextDynamic(() => import("@/components/PetaMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "rgba(251,146,60,0.03)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
        <span className="text-xs text-white/20 font-mono tracking-widest uppercase">
          Memuat Peta Nusantara…
        </span>
      </div>
    </div>
  ),
});

interface School {
  id: string;
  nama_sekolah: string;
  latitude: number;
  longitude: number;
  status: string;
  status_validasi: string;
}

interface PetaClientProps {
  schools: School[];
  counts: { total: number; komitmen: number };
}

function PetaContent({ schools }: { schools: School[] }) {
  const searchParams = useSearchParams();
  const schoolId = searchParams.get("schoolId");
  return <PetaMap schoolId={schoolId || undefined} schools={schools} />;
}

const legend = [
  {
    icon: BadgeCheck,
    label: "Komitmen",
    accent: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.25)",
  },
  {
    icon: ClipboardList,
    label: "Sudah Survei",
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
  },
  {
    icon: MapPin,
    label: "Belum Ikut",
    accent: "#94a3b8",
    bg: "rgba(148,163,184,0.08)",
    border: "rgba(148,163,184,0.18)",
  },
];

export function PetaClient({ schools, counts }: PetaClientProps) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const komitmenPct =
    counts.total > 0 ? Math.round((counts.komitmen / counts.total) * 100) : 0;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505]">
      {/* ── Dynamic Glowing Mesh ── */}
      <div className="absolute inset-0 bg-white/[0.01] mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[0%] right-[5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] mix-blend-screen pointer-events-none" />
        <div className="absolute top-[40%] left-[40%] w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-16">
        {/* Journey bar */}
        {(from === "survei" || from === "komitmen") && (
          <div className="mb-8">
            <JourneyBar />
          </div>
        )}

        {/* Success alert */}
        {(from === "survei" || from === "komitmen") && (
          <div
            className="max-w-2xl mx-auto mb-8 flex items-center gap-3 px-5 py-4 rounded-2xl"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.22)",
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-black"
              style={{ background: "rgba(16,185,129,0.18)", color: "#10b981" }}
            >
              ✓
            </div>
            <p className="text-sm font-medium text-white/65">
              {from === "survei"
                ? "Data survei berhasil disimpan. Posisi sekolah Anda kini terlihat di peta."
                : "Sertifikat berhasil disahkan. Sekolah Anda resmi berstatus komitmen."}
            </p>
          </div>
        )}

        {/* ── Header ── */}
        <div
          id="tour-peta-header"
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          {/* Left: title */}
          <div className="flex-1">
            {/* Live badge */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{
                  background: "rgba(249,115,22,0.1)",
                  borderColor: "rgba(249,115,22,0.28)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
                </span>
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{ color: "#fb923c" }}
                >
                  Live · Real-time
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight">
              Peta{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #fb923c 0%, #f97316 40%, #ea580c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Partisipasi
              </span>
              <br />
              <span className="text-white/28 text-3xl md:text-4xl font-black">
                Sekolah Nasional
              </span>
            </h1>

            <p className="text-white/38 text-base mt-4 max-w-lg font-medium leading-relaxed">
              Lihat distribusi komitmen pemanfaatan gadget sehat dari
              sekolah-sekolah di seluruh Nusantara.
            </p>
          </div>

          {/* Right: stat cards */}
          <div className="flex gap-3 shrink-0">
            {[
              {
                value: counts.total > 0 ? `${counts.total}` : "—",
                label: "Total Sekolah",
                icon: Globe2,
                color: "#f97316",
                glow: "#f97316",
              },
              {
                value: counts.komitmen > 0 ? `${counts.komitmen}` : "—",
                label: "Komitmen",
                icon: BadgeCheck,
                color: "#10b981",
                glow: "#10b981",
              },
              {
                value: `${komitmenPct}%`,
                label: "Rasio",
                icon: Flame,
                color: "#fb923c",
                glow: "#fb923c",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative min-w-[95px] rounded-2xl p-4 overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                  style={{ background: stat.glow }}
                />
                <stat.icon
                  className="w-4 h-4 mb-3 relative z-10"
                  style={{ color: stat.color }}
                />
                <div className="text-2xl font-black text-white relative z-10 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-0.5 relative z-10">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Map card ── */}
        <div id="tour-peta-map-section" className="relative">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              background: "#080c14",
            }}
          >
            {/* Corner accents — orange */}
            <div className="absolute top-0 left-0 w-16 h-16 z-[60] pointer-events-none">
              <svg viewBox="0 0 64 64" fill="none">
                <path
                  d="M2 32 L2 2 L32 2"
                  stroke="#f97316"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 z-[60] pointer-events-none">
              <svg viewBox="0 0 64 64" fill="none">
                <path
                  d="M62 32 L62 2 L32 2"
                  stroke="#f97316"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>

            {/* Map + sidebar */}
            <div className="flex flex-col md:flex-row">
              {/* Map area */}
              <div className="relative flex-1" style={{ height: "560px" }}>
                <style>{`
                  .peta-leaflet-wrap,
                  .peta-leaflet-wrap .leaflet-container {
                    position: absolute !important;
                    inset: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    background: #080c14 !important;
                  }
                `}</style>
                <div className="peta-leaflet-wrap">
                  <Suspense
                    fallback={
                      <div
                        className="w-full h-full animate-pulse"
                        style={{ background: "rgba(249,115,22,0.03)" }}
                      />
                    }
                  >
                    <PetaContent schools={schools} />
                  </Suspense>
                </div>

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none z-[450]">
                  <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#080c14]/60 to-transparent" />
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#080c14]/55 to-transparent" />
                  <div className="hidden md:block absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#080c14]/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#080c14]/70 to-transparent" />
                </div>

                {/* Interaction blocker removed so map can be scrolled and zoomed */}
              </div>

              {/* Legend sidebar */}
              <div
                id="tour-peta-legend"
                className="md:w-60 shrink-0 flex flex-col"
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.018)",
                }}
              >
                {/* Sidebar header */}
                <div
                  className="px-5 py-4 flex items-center gap-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <MapPin
                    className="w-3.5 h-3.5"
                    style={{ color: "#f97316" }}
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/25">
                    Indikator Status
                  </span>
                </div>

                {/* Legend items */}
                <div className="px-4 py-4 space-y-2">
                  {legend.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                      style={{
                        background: item.bg,
                        border: `1px solid ${item.border}`,
                      }}
                    >
                      <item.icon
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: item.accent }}
                      />
                      <span className="text-sm font-semibold text-white/55">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats block */}
                <div
                  className="mt-auto px-4 py-5 space-y-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/22 font-semibold">
                      Total terdaftar
                    </span>
                    <span className="text-sm font-black text-white/65">
                      {counts.total > 0 ? counts.total : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/22 font-semibold">
                      Berkomitmen
                    </span>
                    <span
                      className="text-sm font-black"
                      style={{
                        color:
                          counts.komitmen > 0
                            ? "#10b981"
                            : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {counts.komitmen > 0 ? counts.komitmen : "—"}
                    </span>
                  </div>

                  {/* Progress bar — orange → emerald */}
                  <div>
                    <div
                      className="w-full rounded-full overflow-hidden"
                      style={{
                        height: "4px",
                        background: "rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${komitmenPct}%`,
                          background:
                            "linear-gradient(90deg, #f97316, #10b981)",
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-white/18 text-right font-mono mt-1.5">
                      {komitmenPct}% rasio komitmen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom info strip */}
            <div
              className="grid grid-cols-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { label: "Data diperbarui", value: "Setiap hari" },
                { label: "Cakupan wilayah", value: "Seluruh Indonesia" },
                { label: "Status sistem", value: "Operasional" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center py-4 px-3 gap-0.5"
                  style={{
                    borderRight:
                      i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/18">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-white/50">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA strip — from=survei */}
          {from === "survei" && (
            <div
              id="tour-peta-cta"
              className="mt-6 relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(249,115,22,0.18)",
              }}
            >
              {/* Orange left bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{
                  background: "linear-gradient(180deg, #f97316, #fb923c)",
                }}
              />
              {/* Glow */}
              <div
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-2xl opacity-10"
                style={{ background: "#f97316" }}
              />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pl-8 pr-6 py-6">
                <div>
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.2em] mb-1"
                    style={{ color: "rgba(251,146,60,0.65)" }}
                  >
                    Langkah Berikutnya
                  </p>
                  <h3 className="text-lg font-black text-white mb-1">
                    Sudah melihat posisi sekolah Anda?
                  </h3>
                  <p className="text-white/38 text-sm font-medium">
                    Langkah selanjutnya adalah mengesahkan komitmen digital.
                  </p>
                </div>
                <Link href="/komitmen" className="shrink-0 w-full md:w-auto">
                  <button
                    className="group w-full md:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200"
                    style={{
                      background:
                        "linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)",
                      boxShadow: "0 0 28px rgba(249,115,22,0.35)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.boxShadow = "0 0 44px rgba(249,115,22,0.52)";
                      el.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.boxShadow = "0 0 28px rgba(249,115,22,0.35)";
                      el.style.transform = "scale(1)";
                    }}
                  >
                    Lanjut ke Komitmen
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <TourGuide
        pageName="Peta"
        steps={[
          {
            element: "#tour-journey-bar",
            popover: {
              title: "Jejak Langkah",
              description:
                "Lihat dimana Anda berada dari keseluruhan 3 langkah partisipasi ekosistem.",
            },
          },
          {
            element: "#tour-peta-header",
            popover: {
              title: "Papan Partisipasi Nasional",
              description:
                "Ini adalah halaman titik temu bagi sekolah-sekolah di seluruh Nusantara.",
            },
          },
          {
            element: "#tour-peta-map-section",
            popover: {
              title: "Peta Persebaran",
              description:
                "Titik warna menunjukkan status partisipasi sekolah di setiap wilayah.",
            },
          },
          {
            element: "#tour-peta-legend",
            popover: {
              title: "Label Status",
              description:
                "Perhatikan indikator warna ini untuk memahami pemosisian setiap titik wilayah.",
            },
          },
          {
            element: "#tour-peta-cta",
            popover: {
              title: "Langkah Terakhir",
              description:
                "Setelah melihat Peta, klik tombol di sini untuk melegalkan pengesahan komitmen.",
            },
          },
        ]}
      />
    </div>
  );
}
