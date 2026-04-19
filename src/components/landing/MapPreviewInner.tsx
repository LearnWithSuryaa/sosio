"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "@/lib/supabase";

// ── Lucide SVG paths (inline, no CDN) ─────────────────────────────────────
// BadgeCheck — untuk status komitmen
const ICON_CHECK =
  `<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>` +
  `<path d="m9 12 2 2 4-4"/>`;

// ClipboardList — untuk status survei
const ICON_CLIPBOARD =
  `<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>` +
  `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>` +
  `<path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>`;

// MapPin — untuk status belum ikut
const ICON_MAP_PIN =
  `<path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/>` +
  `<circle cx="12" cy="10" r="3"/>`;

/** Buat L.divIcon dari SVG path Lucide dengan warna tertentu */
function makeLucideMarker(svgPaths: string, bg: string, border: string, isPending: boolean = false): L.DivIcon {
  const html = `
    <div style="
      width:28px; height:28px;
      background:${bg};
      border-radius:50%;
      border:2px solid ${border};
      box-shadow:0 2px 8px ${bg}90;
      opacity: ${isPending ? 0.5 : 1};
      display:flex; align-items:center; justify-content:center;
    ">
      <svg width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="white"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        ${svgPaths}
      </svg>
    </div>`;

  return L.divIcon({
    html,
    className: "",       // hapus class default leaflet (background kotak)
    iconSize: isPending ? [24, 24] : [28, 28],
    iconAnchor: isPending ? [12, 12] : [14, 14],
  });
}

// ── Icon per status ────────────────────────────────────────────────────────
const iconGreen  = makeLucideMarker(ICON_CHECK,     "#10B981", "#059669"); // emerald
const iconYellow = makeLucideMarker(ICON_CLIPBOARD, "#F59E0B", "#D97706"); // amber
const iconGray   = makeLucideMarker(ICON_MAP_PIN,   "#94A3B8", "#64748B"); // slate

const iconGreenPending  = makeLucideMarker(ICON_CHECK,     "#10B981", "#059669", true);
const iconYellowPending = makeLucideMarker(ICON_CLIPBOARD, "#F59E0B", "#D97706", true);
const iconGrayPending   = makeLucideMarker(ICON_MAP_PIN,   "#94A3B8", "#64748B", true);

interface School {
  id: string;
  nama_sekolah: string;
  latitude: number;
  longitude: number;
  status: string;
  status_validasi: string;
}

/** Disable semua interaksi map untuk mode preview */
function DisableInteractions() {
  const map = useMap();
  useEffect(() => {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    // `tap` exists at runtime on mobile but is missing from @types/leaflet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((map as any).tap) (map as any).tap.disable();
  }, [map]);
  return null;
}

function getIcon(status: string, validasi: string) {
  const isPending = validasi === "pending";
  if (status === "komitmen") return isPending ? iconGreenPending : iconGreen;
  if (status === "survei") return isPending ? iconYellowPending : iconYellow;
  return isPending ? iconGrayPending : iconGray;
}

export default function MapPreviewInner() {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    supabase
      .from("schools")
      .select("id, nama_sekolah, latitude, longitude, status, status_validasi")
      .limit(300)
      .then(({ data }) => {
        if (data) setSchools(data);
      });
  }, []);

  return (
    <MapContainer
      center={[-2.5489, 118.0149]}
      zoom={5}
      zoomControl={false}
      attributionControl={false}
      className="w-full h-[420px]"
      style={{ cursor: "default" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <DisableInteractions />

      {schools.filter(s => s.status_validasi !== 'flagged').map((school) => (
        <Marker
          key={school.id}
          position={[school.latitude, school.longitude]}
          icon={getIcon(school.status, school.status_validasi)}
          interactive={false}
        />
      ))}
    </MapContainer>
  );
}
