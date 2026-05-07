import { Suspense } from "react";
import { PetaClient } from "./PetaClient";
import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

export const revalidate = 60; // fallback ISR: 1 menit (revalidatePath/revalidateTag di server action sbg mekanisme utama)

const getCachedMapData = unstable_cache(
  async () => {
    const [{ count: t }, { count: k }, { data: schools }] = await Promise.all([
      supabase.from("schools").select("*", { count: "exact", head: true }),
      supabase
        .from("schools")
        .select("*", { count: "exact", head: true })
        .eq("status", "komitmen"),
      supabase
        .from("schools")
        .select(
          "id, nama_sekolah, latitude, longitude, status, status_validasi",
        )
        .neq("status_validasi", "flagged")
        .not("latitude", "is", null)
        .not("longitude", "is", null)
        .limit(500),
    ]);

    return {
      total: t || 0,
      komitmen: k || 0,
      schools: schools || [],
    };
  },
  ["peta-map-data"],
  {
    revalidate: 60, // fallback: data paling tua 1 menit jika revalidateTag gagal dipanggil
    tags: ["peta-map-data"], // tag agar bisa di-invalidate via revalidateTag()
  },
);

export default async function PetaPage() {
  const data = await getCachedMapData();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 text-center text-gray-500 font-medium">
          Memuat halaman Peta...
        </div>
      }
    >
      <PetaClient
        schools={data.schools}
        counts={{ total: data.total, komitmen: data.komitmen }}
      />
    </Suspense>
  );
}
