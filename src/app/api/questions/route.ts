import { NextResponse } from "next/server";
import { quizService } from "@/lib/services/quizService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    
    const questions = await quizService.getQuestions(category || undefined);
    return NextResponse.json({ success: true, data: questions });
  } catch (error: any) {
    console.error("GET /api/questions error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
