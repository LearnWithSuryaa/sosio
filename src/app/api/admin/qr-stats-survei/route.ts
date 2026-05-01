import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const [campaignsRes, surveyRes] = await Promise.all([
      supabaseAdmin
        .from("qr_campaigns")
        .select("id, name, source, created_at")
        .ilike("source", "survei-%")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("survey_results")
        .select("source")
        .not("source", "is", null)
    ]);

    if (campaignsRes.error) throw campaignsRes.error;
    if (surveyRes.error) throw surveyRes.error;

    // Build a count map from source → number of participants
    const countMap: Record<string, number> = {};
    for (const row of surveyRes.data || []) {
      const source = row.source;
      if (source) {
        countMap[source] = (countMap[source] || 0) + 1;
      }
    }

    const enriched = (campaignsRes.data || []).map((campaign: any) => ({
      ...campaign,
      participantCount: countMap[campaign.source] || 0,
    }));

    return NextResponse.json({ success: true, data: enriched });
  } catch (error: any) {
    console.error("[qr-stats-survei GET] error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
