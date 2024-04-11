import { regenerateToken } from "@/lib/authServices";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await regenerateToken(request);
}