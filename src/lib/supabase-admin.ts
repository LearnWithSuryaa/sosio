import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Admin client — menggunakan SERVICE_ROLE_KEY untuk bypass RLS.
 * HANYA digunakan di server-side (API routes). Jangan expose ke client!
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
