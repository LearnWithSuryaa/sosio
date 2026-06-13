"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowRightLeft,
} from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  // Variants untuk staggered animation pada form
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center md:justify-end px-4 md:px-0 md:pr-[8%] lg:pr-[12%]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Background 5.svg ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/login/5.svg"
          alt="Login background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay tipis untuk mobile agar card lebih terbaca jika background ramai */}
        <div className="absolute inset-0 bg-white/30 md:hidden backdrop-blur-[2px]" />
      </motion.div>

      {/* ── Foreground Character 6.svg ── */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="hidden md:block absolute z-0 pointer-events-none"
        style={{
          width: "95%" /* <-- ATUR LEBAR (contoh: "775px" atau "60%") */,
          height: "95%" /* <-- ATUR TINGGI (contoh: "552px" atau "100%") */,
          left: "50px" /* <-- ATUR POSISI KIRI (contoh: "76.8px" atau "5%") */,
          bottom: "0px" /* <-- ATUR POSISI BAWAH (contoh: "-20px" atau "0") */,
          // top: "216px",    /* <-- Jika ingin menggunakan jarak dari atas (hapus 'bottom' jika pakai 'top') */
        }}
      >
        <Image
          src="/images/login/6.svg"
          alt="Character illustration"
          fill
          className="object-contain"
          style={{
            objectPosition:
              "left bottom" /* <-- Atur posisi gambar di dalam wadah (misal: "center bottom") */,
            transform:
              "scale(1)" /* <-- Atur skala/zoom gambar (misal: "scale(1.1)") */,
            transformOrigin: "left bottom" /* <-- Titik pusat skala zoom */,
          }}
          priority
        />
      </motion.div>

      {/* ── Login Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-112.5"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl p-8 sm:p-10"
          style={{
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#e8f5e9" }}
              >
                <Lock className="w-5 h-5" style={{ color: "#2e7d32" }} />
              </motion.div>
              <h1
                className="text-[26px] font-bold"
                style={{ color: "#1f2937" }}
              >
                Login Admin
              </h1>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
              Masuk ke portal administrasi untuk mengakses pusat kendali,
              mengelola data pengguna, serta memantau seluruh aktivitas sistem.
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-sm font-semibold"
                style={{ color: "#374151" }}
              >
                Surel (Email)
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 pointer-events-none transition-colors group-focus-within:text-green-700"
                  style={{ color: "#9ca3af" }}
                />
                <input
                  type="email"
                  id="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@gesamega.id"
                  className="w-full pl-10 pr-4 py-3 text-sm outline-none transition-all border rounded-lg"
                  style={{
                    borderColor: "#e5e7eb",
                    color: "#1f2937",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#2e7d32";
                    e.target.style.boxShadow = "0 0 0 3px rgba(46,125,50,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold"
                style={{ color: "#374151" }}
              >
                Kata Sandi
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 pointer-events-none transition-colors group-focus-within:text-green-700"
                  style={{ color: "#9ca3af" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm outline-none transition-all border rounded-lg"
                  style={{
                    borderColor: "#e5e7eb",
                    color: "#1f2937",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#2e7d32";
                    e.target.style.boxShadow = "0 0 0 3px rgba(46,125,50,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                  style={{ color: "#9ca3af" }}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember me + Forgot Password */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between pt-1"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-green-700 shadow-sm focus:border-green-700 focus:ring focus:ring-green-200 focus:ring-opacity-50 w-4 h-4 cursor-pointer"
                  style={{ accentColor: "#2e7d32" }}
                />
                <span
                  className="text-[13px] font-medium"
                  style={{ color: "#4b5563" }}
                >
                  Ingat saya
                </span>
              </label>
              <button
                type="button"
                className="text-[13px] font-semibold hover:underline"
                style={{ color: "#2e7d32" }}
              >
                Lupa kata sandi?
              </button>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border mt-2 bg-red-50 border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-xs font-medium text-red-600">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || !email || !password}
                className="w-full rounded-lg py-3.5 flex items-center justify-center gap-2 text-white text-sm font-bold transition-all shadow-md disabled:opacity-70 bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <ArrowRightLeft className="w-4.5 h-4.5" />
                    <span>Masuk</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mt-7 mb-5"
          >
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
              atau
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </motion.div>

          {/* Register Link */}
          <motion.div variants={itemVariants} className="text-center">
            <span className="text-[13px]" style={{ color: "#6b7280" }}>
              Belum punya akun?{" "}
            </span>
            <button
              type="button"
              className="text-[13px] font-bold hover:underline"
              style={{ color: "#1b5e20" }}
            >
              Hubungi Super Admin
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
