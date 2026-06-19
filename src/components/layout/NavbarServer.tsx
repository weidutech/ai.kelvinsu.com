import { Navbar } from "@/components/layout/Navbar";
import { getOptionalNavbarUserClaims } from "@/lib/supabase/claims";

export async function NavbarServer() {
  let claims = null;

  try {
    claims = await getOptionalNavbarUserClaims();
  } catch {
    claims = null;
  }

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
