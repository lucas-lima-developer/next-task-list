import AuthService from "@/lib/services/AuthService";
import { NextRequest, NextResponse } from "next/server";

export default class MiddlewareHelper {
  private response : NextResponse = NextResponse.next();
  private request: NextRequest;

  constructor(request: NextRequest) {
    this.request = request;
  }

  async regenerateToken() :  Promise<NextResponse | void> {
    const email = await AuthService.getEmailFromToken();

    if (!email) return NextResponse.redirect(new URL('/login', this.request.url));

    const token = await AuthService.encryptToken(email);

    this.response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      expires: new Date(Date.now() + AuthService.ExpirationTokenTime * 60000)
    });
  }

  getResponse() : NextResponse {
    return this.response;
  }
}