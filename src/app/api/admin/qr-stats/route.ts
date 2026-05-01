import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET: Fetch all QR campaigns with participant counts
// Uses 2 parallel queries instead of N+1 (one per campaign)
export async function GET() {
  try {
    // Fetch campaigns & all quiz_results sources in parallel
    const [campaignsRes, countsRes] = await Promise.all([
      supabaseAdmin
        .from("qr_campaigns")
        .select("id, name, source, created_at")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("quiz_results")
        .select("source")
        .not("source", "is", null),
    ]);

    if (campaignsRes.error) throw campaignsRes.error;
    if (countsRes.error) throw countsRes.error;

    // Build a count map from source → number of participants
    const countMap: Record<string, number> = {};
    for (const row of countsRes.data || []) {
      if (row.source) {
        countMap[row.source] = (countMap[row.source] || 0) + 1;
      }
    }

    const enriched = (campaignsRes.data || []).map((campaign: any) => ({
      ...campaign,
      participantCount: countMap[campaign.source] || 0,
    }));

    return NextResponse.json({ success: true, data: enriched });
  } catch (error: any) {
    console.error("[qr-stats GET] error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
