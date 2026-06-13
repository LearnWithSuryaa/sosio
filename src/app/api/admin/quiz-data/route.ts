import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "date";
    const exportMode = searchParams.get("export") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    // Mode Stats
    if (type === "stats") {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("result_category");
      if (error) throw error;
      
      const total = data.length;
      const counts: Record<string, number> = {};
      data.forEach(d => {
        const cat = d.result_category || "Uncategorized";
        counts[cat] = (counts[cat] || 0) + 1;
      });
      
      const byCategory = Object.keys(counts)
        .sort()
        .map(name => ({ name, count: counts[name] }));

      return NextResponse.json({ total, byCategory });
    }

    // Prepare query for pagination / export
    let query = supabase
      .from("quiz_results")
      .select("id, user_name, result_category, source, created_at", { count: 'exact' });

    if (search) {
      query = query.ilike("user_name", `%${search}%`);
    }
    if (category) {
      query = query.eq("result_category", category);
    }
    
    if (sort === "name") {
      query = query.order("user_name", { ascending: true });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    if (!exportMode) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    } else {
      // Export mode usually limits to a higher number if necessary, but 10k is fine.
      query = query.limit(10000);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Failed to fetch quiz data", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [], total: count || 0 });
  } catch (error) {
    console.error("Unexpected error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
