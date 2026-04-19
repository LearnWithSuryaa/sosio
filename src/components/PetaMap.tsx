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
  return L.divIcon({ html, className: "", iconSize: isPending ? [24, 24] : [28, 28], iconAnchor: isPending ? [12, 12] : [14, 14], popupAnchor: [0, -16] });
}

const iconGreen  = makeLucideMarker(ICON_CHECK,     "#10B981", "#059669");
const iconYellow = makeLucideMarker(ICON_CLIPBOARD, "#F59E0B", "#D97706");
const iconGray   = makeLucideMarker(ICON_MAP_PIN,   "#94A3B8", "#64748B");

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

interface Props {
  schoolId?: string;
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

export default function PetaKomponen({ schoolId }: Props) {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    async function fetchSchools() {
      const { data, error } = await supabase.from("schools").select("*").limit(500);
      if (error) {
        console.error("Gagal mengambil data peta dari Supabase:", error);
      }
      if (data) {
        setSchools(data);
        console.log("Data sekolah berhasil diambil:", data);
      }
    }
    fetchSchools();
  }, []);

  const getIcon = (status: string, validasi: string) => {
    const isPending = validasi === "pending";
    if (status === "komitmen") return isPending ? iconGreenPending : iconGreen;
    if (status === "survei") return isPending ? iconYellowPending : iconYellow;
    return isPending ? iconGrayPending : iconGray;
  };

  return (
    <div className="w-full h-full relative z-10 rounded-2xl overflow-hidden shadow-md border border-gray-200">
      <MapContainer 
        center={[-2.5489, 118.0149]} 
        zoom={5} 
        scrollWheelZoom={true} 
        className="w-full h-[600px] z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapController schools={schools} targetId={schoolId} />
        
        {schools.filter(s => s.status_validasi !== 'flagged').map((school) => (
          <Marker 
            key={school.id} 
            position={[school.latitude, school.longitude]} 
            icon={getIcon(school.status, school.status_validasi)}
          >
            <Popup>
              <div className="text-center font-sans">
                <h3 className="font-bold text-kominfo-navy mb-1">{school.nama_sekolah}</h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-md uppercase tracking-wider font-semibold ${
                  school.status === 'komitmen' ? 'bg-green-100 text-green-700' : 
                  school.status === 'survei' ? 'bg-yellow-100 text-amber-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {school.status}
                </span>

                {school.status !== 'komitmen' && (
                  <div className="mt-4 border-t pt-3">
                     <a href="/komitmen" className="block text-xs bg-kominfo-blue text-white px-3 py-2 rounded-md hover:bg-blue-700 transition">
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
