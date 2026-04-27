import { supabase } from "@/lib/supabase";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { ParticipationFlow } from "@/components/landing/ParticipationFlow";
import { MapPreview } from "@/components/landing/MapPreview";
import { LiveStatsSection } from "@/components/landing/LiveStatsSection";
import { CaseStudySection } from "@/components/landing/CaseStudySection";
import { QuizSection } from "@/components/landing/QuizSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

// Fallback numbers to provide immediate context & social proof
const BASE_SCHOOLS = 500;
const BASE_COMMITMENTS = 320;

// ISR: revalidate every 1 hour — keeps stats fresh without serverless call per visitor
export const revalidate = 3600;

async function getStats() {
  try {
    const [{ count: totalSchools }, { count: totalCommitments }] = await Promise.all([
      supabase.from("schools").select("*", { count: "exact", head: true }),
      supabase.from("schools").select("*", { count: "exact", head: true }).eq("status", "komitmen"),
    ]);

    return {
      schools: BASE_SCHOOLS + (totalSchools || 0),
      commitments: BASE_COMMITMENTS + (totalCommitments || 0),
    };
  } catch {
    return { schools: BASE_SCHOOLS, commitments: BASE_COMMITMENTS };
  }
}

export default async function Home() {
  const stats = await getStats();

  return (
    <div className="flex flex-col">
      {/* 1. Hero - Entry Point */}
      <HeroSection />

      {/* 2. Problem - Awareness */}
      <ProblemSection />

      {/* 3. Solution - Platform Value */}
      <SolutionSection />

      {/* 4. Participation Flow - User Journey */}
      <ParticipationFlow />

      {/* 5. Map Preview - Social Proof */}
      <MapPreview />

      {/* 6. Live Statistics - Data Driven */}
      <LiveStatsSection schools={stats.schools} commitments={stats.commitments} />

      {/* 7. Case Studies - Inspiration */}
      <CaseStudySection />

      {/* 8. Quiz - Personal Hook */}
      <QuizSection />

      {/* 9. Final CTA - Conversion */}
      <FinalCTA />
    </div>
  );
}
