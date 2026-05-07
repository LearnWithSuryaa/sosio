import { supabase } from "@/lib/supabase";
import { Table as TableIcon, FileText } from "lucide-react";

export const revalidate = 0;

const PAGE_SIZE = 200;

async function getSurveyData() {
  const { data, error } = await supabase
    .from("survey_results")
    .select(
      `
      id,
      nama,
      jawaban,
      source,
      created_at,
      schools (
        nama_sekolah
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (error) {
    console.error("Failed to fetch survey data", error);
    return [];
  }
  return data || [];
}

export default async function DataSurveiPage() {
  const data = await getSurveyData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-orange-500" />
            Data Survei
          </h1>
          <p className="text-gray-500 mt-2">
            Daftar lengkap hasil respons survei sekolah.{" "}
            <span className="text-xs text-gray-400">
              (Menampilkan maks. {PAGE_SIZE} entri terbaru)
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-sm font-bold text-gray-600">
                  Nama Pengisi
                </th>
                <th className="p-4 text-sm font-bold text-gray-600">
                  Asal Sekolah
                </th>
                <th className="p-4 text-sm font-bold text-gray-600">
                  Jumlah Jawaban
                </th>
                <th className="p-4 text-sm font-bold text-gray-600">
                  Source (QR)
                </th>
                <th className="p-4 text-sm font-bold text-gray-600">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row: any) => {
                const schoolName = row.schools ? row.schools.nama_sekolah : "-";
                const jawabanCount = Object.keys(row.jawaban || {}).length;
                const source = row.source;

                return (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-900 font-medium">
                      {row.nama}
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">
                      {schoolName}
                    </td>
                    <td className="p-4 text-sm">
                      <span className="inline-block px-2.5 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-lg border border-orange-100">
                        {jawabanCount} Jawaban
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {source ? (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                          {source}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(row.created_at).toLocaleString("id-ID")}
                    </td>
                  </tr>
                );
              })}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Belum ada data survei.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
