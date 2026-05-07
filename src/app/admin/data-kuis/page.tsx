"use client";

import { useState, useMemo } from "react";
import {
  Table as TableIcon,
  Download,
  Search,
  Filter,
  X,
  ArrowUpDown,
} from "lucide-react";

interface QuizResult {
  id: string;
  user_name: string;
  result_category: string;
  source: string | null;
  created_at: string;
}

const PAGE_SIZE = 200;

export default function DataKuisPage() {
  const [data, setData] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");

  // Fetch data on mount
  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/quiz-data");
      const result = await response.json();
      setData(result || []);
    } catch (error) {
      console.error("Failed to fetch quiz data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useMemo(() => {
    fetchData();
  }, []);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.user_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.result_category === selectedCategory
      );
    }

    if (sortBy === "name") {
      filtered.sort((a, b) => a.user_name.localeCompare(b.user_name));
    } else {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return filtered;
  }, [data, searchTerm, selectedCategory, sortBy]);

  const categories = Array.from(
    new Set(data.map((item) => item.result_category))
  ).sort();
  const sources = Array.from(
    new Set(data.map((item) => item.source).filter(Boolean))
  ).sort() as string[];

  const stats = {
    total: data.length,
    byCategory: categories.map((cat) => ({
      name: cat,
      count: data.filter((d) => d.result_category === cat).length,
    })),
  };

  const handleExportCSV = () => {
    const headers = ["Nama", "Kategori Hasil", "Source (QR)", "Waktu"];
    const rows = filteredData.map((row) => [
      row.user_name,
      row.result_category,
      row.source || "-",
      new Date(row.created_at).toLocaleString("id-ID"),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quiz-data-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <div className="bg-orange-50 rounded-lg p-3">
              <TableIcon className="w-6 h-6 text-orange-600" />
            </div>
            Data Kuis
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola dan analisis hasil kuis dari {data.length} responden
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold text-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-gray-600 text-xs font-semibold mb-1">
            Total Responden
          </p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        {stats.byCategory.slice(0, 3).map((cat) => (
          <div
            key={cat.name}
            className="bg-white p-4 rounded-xl border border-gray-200"
          >
            <p className="text-gray-600 text-xs font-semibold mb-1 truncate">
              {cat.name}
            </p>
            <p className="text-2xl font-bold text-gray-900">{cat.count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama partisipan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "name")}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
          >
            <option value="date">Terbaru</option>
            <option value="name">Nama (A-Z)</option>
          </select>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium text-sm flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Bersihkan
            </button>
          )}
        </div>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="inline-block w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
          <p className="text-gray-500 mt-4">Memuat data...</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <TableIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            {searchTerm || selectedCategory
              ? "Tidak ada data yang sesuai dengan filter"
              : "Belum ada data kuis"}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Nama
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Kategori Hasil
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Source (QR)
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {row.user_name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-lg border border-orange-100">
                        {row.result_category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {row.source ? (
                        <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100">
                          {row.source}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {new Date(row.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(row.created_at).toLocaleTimeString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Info */}
      {filteredData.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
          <span>
            Menampilkan <strong>{filteredData.length}</strong> dari{" "}
            <strong>{data.length}</strong> entri
          </span>
          <span className="text-xs text-gray-500">(Maksimal {PAGE_SIZE} entri)</span>
        </div>
      )}
    </div>
  );
}
