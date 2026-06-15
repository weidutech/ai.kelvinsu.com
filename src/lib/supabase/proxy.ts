import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

const PUBLIC_ROUTES = new Set(["/", "/login", "/signup"]);
const PUBLIC_PREFIXES = ["/auth/confirm"];

function isPublicRoute(pathname: string) {
  if (PUBLIC_ROUTES.has(pathname)) {
    return true;
  }

  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const { url, publishableKey } = getSupabaseEnv();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, search } = request.nextUrl;
  const publicRoute = isPublicRoute(pathname);

  if (!user && !publicRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (user && (pathname === "/login" || pathname === "/signup")) {
    const membersUrl = request.nextUrl.clone();
    membersUrl.pathname = "/members";
    membersUrl.search = "";
    return NextResponse.redirect(membersUrl);
  }

  return response;
}
