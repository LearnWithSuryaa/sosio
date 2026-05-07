import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
      `
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("Failed to fetch survey data", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Unexpected error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
