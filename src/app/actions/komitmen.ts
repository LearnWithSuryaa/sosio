"use server";

import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function submitKomitmen(data: {
  sekolahId?: string;
  sekolah: string;
  penanggungJawab: string;
  signatureUrl: string;
  captchaToken: string;
}) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown_ip";

    // Mock CAPTCHA validation
    if (!data.captchaToken) {
      return { success: false, error: "Validasi CAPTCHA gagal. Silakan coba lagi." };
    }

    // 1. Insert to commitments table
    const { error: dbError } = await supabase.from("commitments").insert({
      nama_sekolah: data.sekolah,
      penanggung_jawab: data.penanggungJawab,
      signature_url: data.signatureUrl
    });
    
    if (dbError) throw dbError;

    // 2. Update schools table status
    let matchQuery = supabase.from("schools").update({ 
      status: "komitmen",
      status_validasi: "valid", // Promote to valid!
    });

    if (data.sekolahId) {
       matchQuery = matchQuery.eq("id", data.sekolahId);
    } else {
       matchQuery = matchQuery.eq("nama_sekolah", data.sekolah);
    }

    const { data: updatedSchool, error: updateError } = await matchQuery.select();

    if (updateError) throw updateError;

    return { success: true, schoolId: updatedSchool?.[0]?.id || data.sekolahId };
  } catch (error: any) {
    console.error("Server Action Komitmen Error:", error);
    return { success: false, error: error.message };
  }
}
