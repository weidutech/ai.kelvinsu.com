import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getOptionalServerUserClaims } from "@/lib/supabase/claims";

export async function requireUser(nextPath: string) {
  const claims = await getOptionalServerUserClaims();

  if (!claims) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  const supabase = await createServerSupabaseClient();
  const user = {
    id: claims.sub,
    email: claims.email ?? null,
  };

  return { supabase, user };
}
