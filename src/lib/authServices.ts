import * as jose from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
const alg = 'HS256';

interface DecodedToken extends jose.JWTPayload {
  email: string;
}

export async function encryptToken(email: any, minutes: number) : Promise<string> {
  const token = await new jose.SignJWT({ email })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(`${minutes}m`)
    .sign(key);

  return token;
}

export async function decryptToken(token: string) {
  const { payload } = await jose.jwtVerify(token, key, {
    algorithms: [alg]
  });

  return payload as DecodedToken;
}

export async function getEmailFromToken() : Promise<string | null> {

  const token = cookies().get('token')?.value

  if (token) {
    const payload = await decryptToken(token);

    return payload.email;
  }

  return null;
}

export async function regenerateToken(request: NextRequest) {
  const email = await getEmailFromToken();

  if (!email) return null;

  const minutes = 15
  const newToken = await encryptToken(email, minutes);

  const response = NextResponse.next();

  response.cookies.set({
    name: 'token',
    value: newToken,
    httpOnly: true,
    expires: new Date(Date.now() + minutes * 60000)
  });

  return response;
}