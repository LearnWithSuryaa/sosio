"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Search, MapPin } from "lucide-react";

interface School {
  id: string;
  nama_sekolah: string;
  status: string;
}

interface Props {
  value: string;
  onChange: (value: string, school?: School) => void;
  placeholder?: string;
}

export function SchoolAutocomplete({ value, onChange, placeholder = "Cari atau ketik nama sekolah baru..." }: Props) {
  const [schools, setSchools] = useState<School[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSchools() {
      const { data } = await supabase.from("schools").select("id, nama_sekolah, status").order("nama_sekolah").limit(500);
      if (data) setSchools(data);
    }
    fetchSchools();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredSchools = schools.filter(s => 
    s.nama_sekolah.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 5); // Max 5 suggestions

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          required
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value, undefined);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-xl border-gray-300 shadow-sm focus:border-kominfo-blue focus:ring-kominfo-blue pl-12 pr-4 py-3 border outline-none transition-all"
        />
      </div>

      {isOpen && value.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {filteredSchools.length > 0 ? (
            <ul className="py-2">
              <li className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b">
                Saran Sekolah Terdaftar
              </li>
              {filteredSchools.map((school) => (
                <li
                  key={school.id}
                  onClick={() => {
                    onChange(school.nama_sekolah, school);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 transition-colors text-sm text-gray-700 font-medium"
                >
                  <Search className="w-4 h-4 text-kominfo-blue" />
                  {school.nama_sekolah}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-sm text-gray-500 bg-gray-50 text-center">
              Sekolah &quot;{value}&quot; belum terdaftar. Menambahkan sebagai sekolah baru!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
