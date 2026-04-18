"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/assets/slide1.jpg",
    title: "Sekolah Berpartisipasi",
  },
  {
    id: 2,
    image: "/assets/slide2.jpg",
    title: "Aktivitas Edukasi",
  },
  {
    id: 3,
    image: "/assets/slide3.jpg",
    title: "Kolaborasi Digital",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];
  const next = slides[(index + 1) % slides.length];

  return (
    <div className="relative w-full max-w-[320px] h-[420px]">

      {/* BACK CARD */}
      <motion.div
        key={next.id}
        className="absolute top-4 left-6 w-full h-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
        initial={{ opacity: 0.6, scale: 0.95 }}
        animate={{ opacity: 0.6, scale: 0.95 }}
      >
        <Image
          src={next.image}
          alt=""
          fill
          className="object-cover"
        />
      </motion.div>

      {/* MAIN CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden bg-white shadow-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Caption */}
          <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
            {current.title}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          key={index}
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "linear" }}
        />
      </div>
    </div>
  );
}