import * as jose from 'jose';
import { cookies } from 'next/headers';

interface DecodedToken extends jose.JWTPayload {
  email: string;
}

export default class AuthService {
  private static readonly Key = new TextEncoder().encode("secret");
  private static readonly Alg = 'HS256';
  static readonly ExpirationTokenTime = 15;

  static async getEmailFromToken(): Promise<string | null> {
    const token = cookies().get('token')?.value;

    if (token) {
      const { email } = await AuthService.decryptToken(token);

      return email;
    }

    return null;
  }

  static async encryptToken(email : string) {
    const token = await new jose.SignJWT({ email })
      .setProtectedHeader({ alg: AuthService.Alg })
      .setIssuedAt()
      .setExpirationTime(`${AuthService.ExpirationTokenTime}m`)
      .sign(AuthService.Key);

      return token;
  }

  static async decryptToken(token: string): Promise<DecodedToken> {
    const { payload } = await jose.jwtVerify(token, AuthService.Key, {
      algorithms: [AuthService.Alg]
    });

    return payload as DecodedToken;
  }
}
