"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 120]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const schools = useCountUp(500, inView);
  const students = useCountUp(12000, inView);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] overflow-hidden flex items-center pt-24 pb-20 lg:pt-32"
    >
      {/* ── Background Photo with parallax ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20 -bottom-20 pointer-events-none"
      >
        <img
          src="/images/city-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ── Dark + Orange overlay ── */}
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-gray-950/70" />
      {/* Orange tint wash */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/80 via-orange-900/30 to-transparent" />

      {/* ── Vector Art Decorative Elements ── */}

      {/* Large circle ring top-right */}
      <svg
        className="absolute -top-24 -right-24 w-[480px] h-[480px] opacity-20 pointer-events-none"
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="240" cy="240" r="220" stroke="#F97316" strokeWidth="2" />
        <circle
          cx="240"
          cy="240"
          r="180"
          stroke="#FB923C"
          strokeWidth="1"
          strokeDasharray="8 12"
        />
        <circle cx="240" cy="240" r="130" stroke="#FDBA74" strokeWidth="0.5" />
      </svg>

      {/* Grid dots pattern bottom-left */}
      <svg
        className="absolute bottom-16 left-0 w-64 h-64 opacity-15 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 20 + 10}
              cy={row * 20 + 10}
              r="1.5"
              fill="#F97316"
            />
          )),
        )}
      </svg>

      {/* Diagonal accent line */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="900"
          x2="600"
          y2="0"
          stroke="#F97316"
          strokeWidth="1"
        />
        <line
          x1="100"
          y1="900"
          x2="700"
          y2="0"
          stroke="#FB923C"
          strokeWidth="0.5"
        />
      </svg>

      {/* Hexagon vector */}
      <svg
        className="absolute top-1/2 -right-16 -translate-y-1/2 w-64 h-64 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="100,10 185,55 185,145 100,190 15,145 15,55"
          stroke="#F97316"
          strokeWidth="1.5"
          fill="none"
        />
        <polygon
          points="100,35 162,68 162,132 100,165 38,132 38,68"
          stroke="#FB923C"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Orange glow blob center-left */}
      <div className="absolute left-0 top-1/3 w-96 h-96 rounded-full bg-orange-500/20 blur-[100px] pointer-events-none" />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl px-6 mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-orange-400/40 bg-orange-500/10 backdrop-blur-sm text-orange-300 text-sm font-semibold tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            Gerakan Nasional Ekosistem Digital 2026
          </motion.div>

          {/* Headline */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-5xl lg:text-7xl font-extrabold py-1 leading-[1.05] tracking-tight text-white"
            >
              Membangun{" "}
              <span
                className="relative inline-block"
                style={{
                  background:
                    "linear-gradient(135deg, #fb923c 0%, #f97316 40%, #ea580c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Pendidikan
              </span>{" "}
              Era Digital
            </motion.h1>
          </div>

          {/* Thin divider line – editorial touch */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hidden lg:block w-16 h-[2px] bg-orange-500 mb-8 origin-left"
          />

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-xl mb-10 text-lg md:text-xl text-white/70 leading-relaxed font-medium"
          >
            Inisiatif kolaboratif berbasis partisipasi untuk menciptakan
            penggunaan gadget yang lebih sehat, terukur, dan berdampak pada
            kualitas pendidikan anak negeri.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/visi-misi" className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-base transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02]">
                Lihat Visi & Misi Kami
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/peta" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-bold text-base hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]">
                Lihat Peta Nasional
              </button>
            </Link>
          </motion.div>

          {/* Mobile Stats */}
          <div className="flex md:hidden gap-8 justify-center mt-10">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-black text-orange-400">
                {schools.toLocaleString("id-ID")}+
              </p>
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mt-1">
                Sekolah
              </p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="flex flex-col items-center">
              <p className="text-3xl font-black text-orange-300">
                {students.toLocaleString("id-ID")}+
              </p>
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mt-1">
                Siswa
              </p>
            </div>
          </div>
        </div>

        {/* Right Content – Glassmorphism Stats Card */}
        <div className="lg:col-span-5 relative hidden md:flex flex-col gap-4">
          {/* Floating label */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xs font-bold text-orange-400/80 uppercase tracking-[0.2em] text-right mb-1"
          >
            Dampak Nyata · 2026
          </motion.p>

          {/* Stats Cards */}
          {[
            {
              icon: ShieldCheck,
              value: `${schools.toLocaleString("id-ID")}+`,
              label: "Sekolah Aktif",
              sub: "di seluruh Indonesia",
              delay: 0.6,
              accent: "#f97316",
            },
            {
              icon: Users,
              value: `${students.toLocaleString("id-ID")}+`,
              label: "Siswa Terlibat",
              sub: "dalam program ini",
              delay: 0.75,
              accent: "#fb923c",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stat.delay, type: "spring", stiffness: 80 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 p-6 flex items-center gap-5 hover:bg-white/10 transition-colors duration-300 group"
            >
              {/* Card inner glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 0% 50%, ${stat.accent}18 0%, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${stat.accent}18`,
                  borderColor: `${stat.accent}30`,
                }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.accent }} />
              </div>

              {/* Text */}
              <div className="relative">
                <p
                  className="text-4xl font-black tracking-tight leading-none"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-white mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-white/40 mt-0.5">{stat.sub}</p>
              </div>

              {/* Decorative corner line */}
              <svg
                className="absolute bottom-3 right-4 opacity-20"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M40 0 L40 40 L0 40"
                  stroke={stat.accent}
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
