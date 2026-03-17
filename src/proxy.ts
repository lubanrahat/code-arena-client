import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/problems";

  // Redirect to login if accessing protected route without token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let userRole: string | undefined;
  try {
    const userCookie = request.cookies.get("role")?.value;
    if (userCookie) {
      userRole = userCookie;
    }
  } catch {
    // Invalid or missing user cookie
  }

  // Redirect to dashboard if accessing auth pages with token
  if ((path === "/login" || path === "/register") && token) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/problems", request.url));
  }

  // Protect /admin routes
  // if (path.startsWith("/admin") && userRole !== "ADMIN") {
  //   return NextResponse.redirect(new URL("/problems", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
