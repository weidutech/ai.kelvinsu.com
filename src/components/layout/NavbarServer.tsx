import { Navbar } from "@/components/layout/Navbar";
import { getOptionalServerUserClaims } from "@/lib/supabase/claims";

export async function NavbarServer() {
  const claims = await getOptionalServerUserClaims();

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
