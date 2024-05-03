import { NextRequest, NextResponse } from "next/server";
import MiddlewareHelper from "@/lib/middleware/MiddlewareHelper";
import AuthService from "@/lib/services/AuthService";

export async function middleware(request: NextRequest) {
  if (!AuthService.isAuthenticated()) return NextResponse.redirect(new URL('/login', request.url));

  const middlewareHelper = new MiddlewareHelper();
  await middlewareHelper.regenerateToken();

  return middlewareHelper.getResponse();
}

export const config = {
  matcher: ['/dashboard/:path*']
} 