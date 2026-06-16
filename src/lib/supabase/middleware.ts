import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = ["/docs", "/members", "/premium"];
const supabaseCookiePrefix = "sb-";

export async function updateSupabaseSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  const isProtectedPath = protectedPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );
  const hasSupabaseCookie = request.cookies
    .getAll()
    .some(({ name }) => name.startsWith(supabaseCookiePrefix));

  if (hasSupabaseCookie || isProtectedPath) {
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}
