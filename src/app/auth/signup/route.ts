import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route";
import {
  getRequestOrigin,
  safeNextPath,
  translateAuthError,
  withAuthMessage,
} from "@/lib/supabase/auth-form";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(formData.get("next"));
  const { supabase, applyAuthCookies } =
    createRouteHandlerSupabaseClient(request);
  const origin = getRequestOrigin(request);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });

  let destination: string;
  if (error) {
    destination = withAuthMessage(
      "/signup",
      "error",
      translateAuthError(error.message)
    );
  } else if (data.session) {
    destination = next;
  } else {
    destination = withAuthMessage(
      "/login",
      "message",
      "注册成功，请先去邮箱确认登录链接。确认完成后再回来登录。"
    );
  }

  return applyAuthCookies(
    NextResponse.json({ redirect: destination }, { status: 200 })
  );
}
