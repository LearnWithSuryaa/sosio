"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "@/lib/supabase";

// Fix generic leaflet icon issues with webpack/next
const iconGreen = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const iconYellow = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const iconGray = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface School {
  id: string;
  nama_sekolah: string;
  latitude: number;
  longitude: number;
  status: string;
}

export default function PetaKomponen() {
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

  const getIcon = (status: string) => {
    if (status === "komitmen") return iconGreen;
    if (status === "survei") return iconYellow;
    return iconGray;
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
        
        {schools.map((school) => (
          <Marker 
            key={school.id} 
            position={[school.latitude, school.longitude]} 
            icon={getIcon(school.status)}
          >
            <Popup>
              <div className="text-center font-sans">
                <h3 className="font-bold text-kominfo-navy mb-1">{school.nama_sekolah}</h3>
                <span className={`px-2 py-1 text-xs rounded-md uppercase tracking-wider font-semibold ${
                  school.status === 'komitmen' ? 'bg-green-100 text-green-700' : 
                  school.status === 'survei' ? 'bg-yellow-100 text-amber-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {school.status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
