import AuthService from "@/lib/services/AuthService";
import { NextResponse } from "next/server";

export default class MiddlewareHelper {
  private response : NextResponse = NextResponse.next();

  async regenerateToken() :  Promise<void | NextResponse> {
    const email = await AuthService.getEmailFromToken();

    if (email) {
      const token = await AuthService.encryptToken(email);
  
      this.response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        expires: new Date(Date.now() + AuthService.ExpirationTokenTime * 60000)
      });
    }
  }

  getResponse() : NextResponse {
    return this.response;
  }
}