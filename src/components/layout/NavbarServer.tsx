import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";

export async function NavbarServer() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Navbar
      user={
        user
          ? {
              email: user.email || null,
            }
          : null
      }
    />
  );
}
