import { ZodIssue } from "zod";

export function zodErrorMessageHelper(array: ZodIssue[]) {
	let mensagem = '';
	array.map(error => mensagem += (error.message + ', '));
	const capitalizedString = mensagem.charAt(0).toUpperCase() + mensagem.slice(1).toLowerCase().slice(0, -2) + '.';
	return capitalizedString;
}