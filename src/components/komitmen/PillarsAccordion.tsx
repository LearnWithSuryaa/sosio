"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronDown } from "lucide-react";

const PILLARS = [
  {
    num: "01",
    text: "Memastikan perangkat digital digunakan",
    bold: "khusus untuk menunjang pendidikan",
  },
  {
    num: "02",
    text: "Menetapkan",
    bold: "aturan tegas batasan waktu akses gawai",
    suffix: "di area sekolah.",
  },
  {
    num: "03",
    text: "Mensosialisasikan bahaya cyberbullying & dampaknya pada",
    bold: "kesehatan mental",
  },
  {
    num: "04",
    text: "Memberikan ruang diskusi literasi dan",
    bold: "etika digital",
    suffix: "bagi siswa.",
  },
  {
    num: "05",
    text: "Melibatkan",
    bold: "orang tua",
    suffix: "dalam memantau penggunaan gadget anak di rumah.",
  },
];

export function PillarsAccordion() {
  const [showPillars, setShowPillars] = useState(false);

  return (
    <div
      id="tour-komitmen-pilar"
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <button
        type="button"
        onClick={() => setShowPillars(!showPillars)}
        className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-black/3"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(46, 125, 50,0.15)",
              color: "#64B5F6",
            }}
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-bold text-text-dark text-sm">
            Baca 5 Pilar Komitmen Nasional
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${showPillars ? "rotate-180" : ""}`}
          style={{ color: "rgba(55, 71, 79, 0.5)" }}
        />
      </button>
      <AnimatePresence>
        {showPillars && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-6 pb-6 pt-2"
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
            >
              <ul className="space-y-4">
                {PILLARS.map((p) => (
                  <li key={p.num} className="flex gap-3 text-sm">
                    <span
                      className="font-black shrink-0 select-none"
                      style={{ color: "#64B5F6" }}
                    >
                      {p.num}
                    </span>
                    <span style={{ color: "rgba(55, 71, 79, 0.6)" }}>
                      {p.text}{" "}
                      <strong className="font-semibold text-text-dark">
                        {p.bold}
                      </strong>
                      {p.suffix ? ` ${p.suffix}` : "."}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
