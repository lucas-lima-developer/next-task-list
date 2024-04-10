import jwt from 'jsonwebtoken';

const secretKey = "secret";

export async function encryptToken(email: any, minutes: number) {
  const token = await jwt.sign({ email }, secretKey, { expiresIn: `${minutes}m`, });
  return token;
}

export async function decryptToken(token: string) {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
}

export async function getEmailFromToken(token: string) {
  const decoded = jwt.verify(token, secretKey);

  if (typeof decoded == 'object') {
    return decoded.email;
  }

  return null;
}