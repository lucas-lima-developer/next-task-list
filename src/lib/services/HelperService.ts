import { ZodIssue } from "zod";

/**
 * Classe de serviços de ajuda.
 *
 * @export
 * @class HelperService
 */
export default class HelperService {

  /**
   * Função que formata erros ocorridos no zod.
   *
   * @static
   * @param {ZodIssue[]} erros - erros do zod.
   * @return {string} - mensagens de erro do zod formatado 
   * @memberof HelperService
   */
  static zodErrorMessageFormat(erros: ZodIssue[]) {
    let message = '';
    erros.map(erro => message += (erro.message + ', '));
    return message.charAt(0).toUpperCase() + message.slice(1).toLocaleLowerCase().slice(0, -2) + '.';
  }
}