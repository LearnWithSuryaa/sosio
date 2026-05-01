import { supabase } from "@/lib/supabase";
import { Users, FileText, BarChart3, TrendingUp } from "lucide-react";

export const revalidate = 0; // Disable cache for admin page

async function getStats() {
  // Single query: fetch only fields needed for both stats + category distribution
  const { data: results, error } = await supabase
    .from("quiz_results")
    .select("id, result_category");

  if (error) {
    console.error("Failed to fetch admin stats", error);
    return { totalUsers: 0, totalQuizzes: 0, categories: {} };
  }

  const rows = results || [];
  const totalQuizzes = rows.length;

  // Count unique users (by index, since all rows are individual submissions)
  const categories: Record<string, number> = {};
  rows.forEach((r) => {
    categories[r.result_category] = (categories[r.result_category] || 0) + 1;
  });

  return {
    totalUsers: totalQuizzes, // each quiz submission = one user
    totalQuizzes,
    categories,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { title: "Total Pengguna", value: stats.totalUsers, icon: Users, color: "bg-blue-500" },
    { title: "Kuis Diselesaikan", value: stats.totalQuizzes, icon: FileText, color: "bg-orange-500" },
    { title: "Tingkat Penyelesaian", value: "100%", icon: TrendingUp, color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Ringkasan aktivitas dan metrik performa aplikasi Anda.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${stat.color}`}>
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Distribusi Kategori Hasil</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(stats.categories).map(([category, count]) => {
              const percentage = Math.round((count / stats.totalQuizzes) * 100) || 0;
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="font-bold text-gray-900">{percentage}% ({count})</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-orange-500 h-full rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(stats.categories).length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">Belum ada data kuis.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
