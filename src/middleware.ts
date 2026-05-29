import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session — keeps cookie fresh on every request
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // ── Protect /admin routes (except /admin/login) ──────────────────────
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("redirected", "1");
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Protect /account and /orders routes ──────────────────────────────
  if (pathname.startsWith("/account") || pathname.startsWith("/orders")) {
    if (!session) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Redirect logged-in users away from /login and /register ──────────
  if ((pathname === "/login" || pathname === "/register") && session) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
    "/orders/:path*",
    "/login",
    "/register",
  ],
};
