"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "@/lib/supabase";

// ── Lucide SVG paths (inline, no CDN) ─────────────────────────────────────
// BadgeCheck — komitmen
const ICON_CHECK =
  `<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>` +
  `<path d="m9 12 2 2 4-4"/>`;

// ClipboardList — survei
const ICON_CLIPBOARD =
  `<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>` +
  `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>` +
  `<path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>`;

// MapPin — belum ikut
const ICON_MAP_PIN =
  `<path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/>` +
  `<circle cx="12" cy="10" r="3"/>`;

function makeLucideMarker(
  svgPaths: string,
  bg: string,
  border: string,
  shadow: string,
  isPending: boolean = false,
): L.DivIcon {
  const size = isPending ? 24 : 30;
  const iconSize = isPending ? 12 : 15;

  const html = `
    <div style="
      width:${size}px; height:${size}px;
      background:${bg};
      border-radius:50%;
      border:2px solid ${border};
      box-shadow: 0 0 10px ${shadow}, 0 2px 6px rgba(0,0,0,0.6);
      opacity: ${isPending ? 0.45 : 1};
      display:flex; align-items:center; justify-content:center;
    ">
      <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24"
        fill="none" stroke="white"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        ${svgPaths}
      </svg>
    </div>`;

  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -16],
  });
}

// ── Icons — vivid on dark map ──────────────────────────────────────────────
const iconGreen = makeLucideMarker(
  ICON_CHECK,
  "#10B981",
  "#34d399",
  "#10b98170",
);
const iconYellow = makeLucideMarker(
  ICON_CLIPBOARD,
  "#f59e0b",
  "#fbbf24",
  "#f59e0b70",
);
const iconGray = makeLucideMarker(
  ICON_MAP_PIN,
  "#475569",
  "#64748b",
  "#47556940",
);

const iconGreenPending = makeLucideMarker(
  ICON_CHECK,
  "#10B981",
  "#34d399",
  "#10b98140",
  true,
);
const iconYellowPending = makeLucideMarker(
  ICON_CLIPBOARD,
  "#f59e0b",
  "#fbbf24",
  "#f59e0b40",
  true,
);
const iconGrayPending = makeLucideMarker(
  ICON_MAP_PIN,
  "#475569",
  "#64748b",
  "#00000020",
  true,
);


interface School {
  id: string;
  nama_sekolah: string;
  latitude: number;
  longitude: number;
  status: string;
  status_validasi: string;
}

interface Props {
  schoolId?: string;
  schools: School[];
}

function MapController({ schools, targetId }: { schools: School[], targetId?: string }) {
  const map = useMap();
  useEffect(() => {
    if (targetId && schools.length > 0) {
      const target = schools.find(s => s.id === targetId);
      if (target) {
        map.flyTo([target.latitude, target.longitude], 12);
      }
    }
  }, [schools, targetId, map]);
  return null;
}

export default function PetaKomponen({ schoolId, schools }: Props) {

  const getIcon = (status: string, validasi: string) => {
    const isPending = validasi === "pending";
    if (status === "komitmen") return isPending ? iconGreenPending : iconGreen;
    if (status === "survei") return isPending ? iconYellowPending : iconYellow;
    return isPending ? iconGrayPending : iconGray;
  };

  return (
    <div className="w-full h-full relative z-10 rounded-2xl overflow-hidden" style={{ background: "#080c14" }}>
      <MapContainer 
        center={[-7.4478, 112.7183]} 
        zoom={11} 
        scrollWheelZoom={true} 
        className="w-full h-[600px] z-10"
        style={{ background: "#080c14" }}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <MapController schools={schools} targetId={schoolId} />
        
        {schools.map((school) => (
          <Marker 
            key={school.id} 
            position={[school.latitude, school.longitude]} 
            icon={getIcon(school.status, school.status_validasi)}
          >
            <Popup>
              <div className="text-center font-sans">
                <h3 className="font-bold text-gray-900 mb-1">{school.nama_sekolah}</h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-md uppercase tracking-wider font-semibold ${
                  school.status === 'komitmen' ? 'bg-emerald-100 text-emerald-700' : 
                  school.status === 'survei' ? 'bg-orange-100 text-orange-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {school.status}
                </span>

                {school.status !== 'komitmen' && (
                  <div className="mt-4 border-t pt-3">
                     <a href="/komitmen" className="block text-xs bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-600 transition">
                       Sahkan Komitmen
                     </a>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
