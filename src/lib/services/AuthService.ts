import * as jose from 'jose';
import { cookies } from 'next/headers';

interface DecodedToken extends jose.JWTPayload {
  email: string;
}

/**
 * Classe responsável por serviços de atutenticação.
 *
 * @export
 * @class AuthService
 */
export default class AuthService {
  private static readonly Key = new TextEncoder().encode("secret");
  private static readonly Alg = 'HS256';
  static readonly ExpirationTokenTime = 15;

  /**
   * Função responsável por entregar email presente no token.
   *
   * @static
   * @return {Promise<string>} - email presente no token.
   * @memberof AuthService
   */
  static async getEmailFromToken(): Promise<string> {
    const token = cookies().get('token')?.value;

    if (token) {
      const { email } = await AuthService.decryptToken(token);

      return email;
    }

    throw new Error("Não existe token nos cookies.");
  }

  /**
   * Responsável por encriptar token.
   *
   * @static
   * @param {string} email - email a ser encriptado no token.
   * @return {Promise<string>} - token encriptado.
   * @memberof AuthService
   */
  static async encryptToken(email: string): Promise<string> {
    const token = await new jose.SignJWT({ email })
      .setProtectedHeader({ alg: AuthService.Alg })
      .setIssuedAt()
      .setExpirationTime(`${AuthService.ExpirationTokenTime}m`)
      .sign(AuthService.Key);

    return token;
  }

  /**
   * Responsável por descriptografar token.
   *
   * @static
   * @param {string} token
   * @return {Promise<DecodedToken>} - token descriptografado.
   * @memberof AuthService
   */
  static async decryptToken(token: string): Promise<DecodedToken> {
    const { payload } = await jose.jwtVerify(token, AuthService.Key, {
      algorithms: [AuthService.Alg]
    });

    return payload as DecodedToken;
  }

  /**
   * Verifica se está autenticado.
   *
   * @static
   * @return {boolean} - resposta se está autenticado.
   * @memberof AuthService
   */
  static isAuthenticated(): boolean {
    const token = cookies().get('token')?.value;

    return typeof token === 'string' && token.trim() !== '';
  }

  /**
   * Remove token dos cookies.
   *
   * @static
   * @memberof AuthService
   */
  static removeTokenFromCookies() {
    cookies().delete('token')
  }
}
