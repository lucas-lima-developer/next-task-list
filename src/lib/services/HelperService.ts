import { ZodIssue } from "zod";

export default class HelperService {
  static zodErrorMessageFormat(erros: ZodIssue[]) {
    let message = '';
    erros.map(erro => message += (erro.message + ', '));
    return message.charAt(0).toUpperCase() + message.slice(1).toLocaleLowerCase().slice(0, -2) + '.';
  }
}