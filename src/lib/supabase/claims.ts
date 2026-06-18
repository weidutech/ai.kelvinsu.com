import { createServerSupabaseClient } from "@/lib/supabase/server";

type AuthClaims = {
  sub?: string;
  email?: string | null;
};

function isRecoverableAuthError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name === "AuthApiError" &&
    /Invalid Refresh Token|Refresh Token Not Found/i.test(error.message)
  );
}

export async function getOptionalServerUserClaims(): Promise<AuthClaims | null> {
  const supabase = await createServerSupabaseClient();

  try {
    const { data } = await supabase.auth.getClaims();
    return (data?.claims as AuthClaims | undefined) ?? null;
  } catch (error) {
    if (isRecoverableAuthError(error)) {
      return null;
    }

    throw error;
  }
}
