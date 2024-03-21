'use server'

import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs';
import { FormDataSignupSchema } from "./schema";
import { zodErrorMessageHelper } from "./helper";
import { createUser, findUserByEmail } from "./userServices";

export async function signupUser(state: any, formData: FormData) {

	const validatedFields = FormDataSignupSchema.safeParse({
		email: formData.get('email'),
		senha: formData.get('senha'),
		confirmarSenha: formData.get('confirmarSenha')
	});

	try {
		if (!validatedFields.success) {
			const messageError = zodErrorMessageHelper(validatedFields.error.errors);
			throw new Error(messageError);
		}
	
		const {email, senha, confirmarSenha} = validatedFields.data;

		if (senha !== confirmarSenha) {
			throw new Error('As senhas devem ser iguais');
		}

		const hashedPassword = await bcrypt.hash(senha, 10);

		const user = await findUserByEmail(email);

		if (user) throw new Error("Esse e-mail já está cadastrado! Informe outro.")

		const newUser = await createUser({
			email,
			senha: hashedPassword
		});

		if (!newUser) throw new Error("Alguma coisa deu errado, entre em contato com o suporte.");
	} catch (error: any) {
		return error.message
	}

	redirect('/login');
}

// TODO Criar Lógica do login, mandando para a '/' quando for autenticado