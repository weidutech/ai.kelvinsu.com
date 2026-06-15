"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  safeNextPath,
  translateAuthError,
  withAuthMessage,
} from "@/lib/supabase/auth-form";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(formData.get("next"));
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const destination = error
    ? withAuthMessage("/login", "error", translateAuthError(error.message))
    : next;

  redirect(destination);
}
