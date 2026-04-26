import { NextResponse } from "next/server";
import { quizService } from "@/lib/services/quizService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.answers || !Array.isArray(body.answers)) {
      return NextResponse.json(
        { success: false, error: "Invalid answers format" },
        { status: 400 }
      );
    }

    const result = await quizService.submitQuiz({
      user_name: body.user_name || "Anonim",
      school_id: body.school_id || null,
      answers: body.answers,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("POST /api/submit-quiz error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit quiz" },
      { status: 500 }
    );
  }
}
