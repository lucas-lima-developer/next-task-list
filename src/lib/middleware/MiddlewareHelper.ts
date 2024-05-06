import AuthService from "@/lib/services/AuthService";
import { NextResponse } from "next/server";

/**
 * Classe responsável por ajudar a middleware.
 *
 * @export
 * @class MiddlewareHelper
 */
export default class MiddlewareHelper {
  private response : NextResponse = NextResponse.next();

  /**
   * Renova o token de autenticação de usuário.
   *
   * @return {(Promise<void>)} - atualiza o atributo privado response.
   * @memberof MiddlewareHelper
   */
  async regenerateToken() :  Promise<void> {
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

  /**
   * Retorna a response.
   *
   * @return {NextResponse} - response.
   * @memberof MiddlewareHelper
   */
  getResponse() : NextResponse {
    return this.response;
  }
}