"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Search, MapPin, CheckCircle2, Clock, Circle } from "lucide-react";

interface School {
  id: string;
  nama_sekolah: string;
  status: string;
}

interface Props {
  value: string;
  onChange: (value: string, school?: School) => void;
  placeholder?: string;
  hasError?: boolean;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  komitmen: { label: "Komitmen ✓",  color: "text-emerald-600 bg-emerald-50",  icon: CheckCircle2 },
  survei:   { label: "Sudah Survei", color: "text-amber-600 bg-amber-50",      icon: Clock },
  belum:    { label: "Belum Ikut",   color: "text-gray-500 bg-gray-100",        icon: Circle },
};

export function SchoolAutocomplete({
  value,
  onChange,
  placeholder = "Cari nama sekolah terdaftar...",
  hasError = false,
}: Props) {
  const [schools, setSchools]   = useState<School[]>([]);
  const [isOpen, setIsOpen]     = useState(false);
  const wrapperRef              = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSchools() {
      const { data } = await supabase
        .from("schools")
        .select("id, nama_sekolah, status")
        .order("nama_sekolah")
        .limit(500);
      if (data) setSchools(data);
    }
    fetchSchools();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = schools
    .filter(s => s.nama_sekolah.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 6);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Input */}
      <div className="relative">
        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-orange-400 pointer-events-none" />
        <input
          required
          type="text"
          value={value}
          onChange={e => { onChange(e.target.value, undefined); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`form-input pl-10 ${hasError ? "has-error" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && value.length > 0 && (
        <div className="absolute z-50 w-full mt-1.5 bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
          {filtered.length > 0 ? (
            <ul>
              <li className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/80 border-b border-gray-100 flex items-center gap-2">
                <Search className="w-3 h-3" />
                Sekolah Terdaftar ({filtered.length})
              </li>
              {filtered.map((school) => {
                const cfg = statusConfig[school.status] || statusConfig["belum"];
                const Icon = cfg.icon;
                return (
                  <li
                    key={school.id}
                    onClick={() => { onChange(school.nama_sekolah, school); setIsOpen(false); }}
                    className="px-4 py-3 hover:bg-orange-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${school.status === 'komitmen' ? 'text-emerald-500' : school.status === 'survei' ? 'text-amber-500' : 'text-gray-400'}`} />
                    <span className="text-sm font-semibold text-gray-800 flex-1 leading-tight">
                      {school.nama_sekolah}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-5 py-5 text-center">
              <p className="text-sm font-semibold text-gray-700 mb-1">Sekolah tidak ditemukan</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Pastikan nama sekolah sesuai dengan nama resmi yang terdaftar di database nasional.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
