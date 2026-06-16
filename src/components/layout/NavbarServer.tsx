import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";

export async function NavbarServer() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims ?? null;

  return (
    <Navbar
      user={
        claims
          ? {
              email: claims.email || null,
            }
          : null
      }
    />
  );
}
