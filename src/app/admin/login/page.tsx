"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 overflow-hidden selection:bg-orange-500/30"
      style={{ background: "#060606", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
          }}
        />
        {/* Orbs */}
        <div
          className="absolute top-[-15%] right-[-15%] w-[700px] h-[700px] rounded-full animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)",
          }}
        />
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[480px] z-10"
      >
        {/* Card glow */}
        <div
          className="absolute -inset-0.5 rounded-[32px] opacity-60"
          style={{
            background:
              "linear-gradient(135deg, rgba(249,115,22,0.25), transparent 50%, rgba(249,115,22,0.1))",
            filter: "blur(20px)",
          }}
        />

        {/* Card */}
        <div
          className="relative border overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(40px) saturate(180%)",
            borderColor: "rgba(255,255,255,0.07)",
            borderRadius: "28px",
            padding: "48px 44px 40px",
            boxShadow: "0 32px 64px -12px rgba(0,0,0,0.8)",
          }}
        >
          {/* Top edge shine */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            }}
          />

          {/* ── Header ── */}
          <div className="text-center mb-10">
            {/* Spinning ring logo */}
            <div className="relative w-[72px] h-[72px] mx-auto mb-5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-[3px] rounded-[22px]"
                style={{
                  background:
                    "conic-gradient(from 180deg, rgba(249,115,22,0.8), rgba(249,115,22,0.1), rgba(249,115,22,0.8))",
                  WebkitMaskImage:
                    "radial-gradient(circle, transparent 60%, black 62%)",
                  maskImage:
                    "radial-gradient(circle, transparent 60%, black 62%)",
                }}
              />
              <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-[72px] h-[72px] rounded-[20px] flex items-center justify-center relative z-10"
                style={{
                  background: "linear-gradient(145deg, #F97316, #EA580C)",
                  boxShadow:
                    "0 0 40px rgba(249,115,22,0.45), 0 10px 30px rgba(0,0,0,0.4)",
                }}
              >
                <ShieldCheck className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <h1
              className="text-[26px] font-black text-white tracking-tight leading-none mb-1.5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              GESA<span className="text-orange-500">MEGA</span>
              <span className="text-white/15 mx-2 font-light">|</span>Admin
            </h1>
            <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/20">
              Secure Management Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-white/35 uppercase tracking-[0.25em] ml-0.5">
                Email Address
              </label>
              <div className="relative group transition-transform duration-200 focus-within:-translate-y-px">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-orange-500 transition-colors pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="username@example.id"
                  className="w-full pl-11 pr-4 py-3.5 text-white font-medium text-sm placeholder-white/10 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(249,115,22,0.45)";
                    e.target.style.background = "rgba(249,115,22,0.08)";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.03)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.07)";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-white/35 uppercase tracking-[0.25em] ml-0.5">
                Security Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-orange-500 transition-colors pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-12 py-3.5 text-white font-medium text-sm placeholder-white/10 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(249,115,22,0.45)";
                    e.target.style.background = "rgba(249,115,22,0.08)";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(249,115,22,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.07)";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/20 hover:text-white hover:bg-white/5 transition-all"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      borderColor: "rgba(239,68,68,0.2)",
                    }}
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-xs font-medium text-red-300">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading || !email || !password}
              whileHover={{
                y: -2,
                boxShadow: "0 16px 36px rgba(249,115,22,0.45)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full mt-2 overflow-hidden text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                borderRadius: "14px",
                padding: "15px",
                fontFamily: "'Syne', sans-serif",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                boxShadow:
                  "0 8px 24px rgba(249,115,22,0.35), 0 2px 4px rgba(0,0,0,0.3)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  x: "-100%",
                }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.6 }}
              />
              {/* Top shine */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                }}
              />

              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Login</span>
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Footer */}
          <div
            className="mt-8 pt-6 border-t text-center"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p
              className="text-[9px] font-semibold uppercase tracking-[0.2em] leading-loose"
              style={{ color: "rgba(255,255,255,0.12)" }}
            >
              Protected by GESA
              <span style={{ color: "rgba(249,115,22,0.4)" }}>MEGA</span>{" "}
              Security Systems
              <br />© 2026 GESAMEGA. Hak Cipta Dilindungi
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
