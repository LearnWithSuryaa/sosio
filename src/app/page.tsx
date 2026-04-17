import { supabase } from "@/lib/supabase";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { PilarSection } from "@/components/landing/PilarSection";

// Fallback numbers to provide immediate context & social proof
const BASE_SCHOOLS = 500;
const BASE_STUDENTS = 12000;

async function getStats() {
  try {
    const { count: currentSchools } = await supabase
      .from("schools")
      .select("*", { count: "exact", head: true });

    // As a demonstration we calculate "students" assuming avg 300 per school
    // or just fetch real ones if we had a students table.
    const realSchools = currentSchools || 0;

    return {
      schools: BASE_SCHOOLS + realSchools,
      students: BASE_STUDENTS + realSchools * 300,
    };
  } catch {
    // Graceful degradation when not connected yet
    return { schools: BASE_SCHOOLS, students: BASE_STUDENTS };
  }
}

export default async function Home() {
  const stats = await getStats();

  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <StatsSection schools={stats.schools} students={stats.students} />
      <PilarSection />
    </div>
  );
}
