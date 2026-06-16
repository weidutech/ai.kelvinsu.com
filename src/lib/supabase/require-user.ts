import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireUser(nextPath: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims ?? null;

  if (!claims) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  const user = {
    id: claims.sub,
    email: claims.email ?? null,
  };

  return { supabase, user };
}
