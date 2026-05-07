"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "@/lib/supabase";

// ── Lucide SVG paths ────────────────────────────────────────────────────────
const ICON_CHECK =
  `<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>` +
  `<path d="m9 12 2 2 4-4"/>`;

const ICON_CLIPBOARD =
  `<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>` +
  `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>` +
  `<path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>`;

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

function DisableInteractions() {
  const map = useMap();
  useEffect(() => {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
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
      center={[-7.4478, 112.7183]}
      zoom={11}
      zoomControl={false}
      attributionControl={false}
      className="w-full h-[420px]"
      style={{ cursor: "default", background: "#080c14" }}
    >
       <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />
        
      <DisableInteractions />

      {schools
        .filter((s) => s.status_validasi !== "flagged")
        .map((school) => (
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
