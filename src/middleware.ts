import { NextRequest } from "next/server";
import MiddlewareHelper from "@/middleware/MiddlewareHelper";

export async function middleware(request: NextRequest) {
  const middlewareHelper = new MiddlewareHelper(request);

  await middlewareHelper.regenerateToken();

  return middlewareHelper.getResponse();
}

export const config = {
  matcher: ['/dashboard/:path*']
}