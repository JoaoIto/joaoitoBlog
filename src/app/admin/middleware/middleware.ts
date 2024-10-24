import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  if (request.nextUrl.pathname.startsWith("/api/admin") && request.nextUrl.pathname !== "/api/admin/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (request.nextUrl.pathname === "/admin/login") {
    if (token) {
      try {
        verify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/admin/form", request.url));
      } catch (error) {
        console.error(error);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/admin/login"],
};