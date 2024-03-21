'use server'

import User from "@/models/User"
import dbConnect from "./dbConnect"
import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs';
import { FormDataSchema } from "./schema";
import { ZodIssue } from "zod";

// FIXME Modificar essa função para um arquivo com funções de usuário
async function findUserByEmail(email: any) {
	await dbConnect();

	const user = await User.findOne({ email }).lean();

	return user;
}

// FIXME Modificar essa função para um arquivo de função helper e melhorar essa função
function organizandoErros(array: ZodIssue[]) {
	let mensagem = '';
	array.map(error => mensagem += (error.message + ', '));
	const capitalizedString = mensagem.charAt(0).toUpperCase() + mensagem.slice(1).toLowerCase();
	return capitalizedString.slice(0, -2);
}

export async function signupUser(state: any, formData: FormData) {

	const validatedFields = FormDataSchema.safeParse({
		email: formData.get('email'),
		senha: formData.get('senha'),
		confirmarSenha: formData.get('confirmarSenha')
	});

	
	try {
		if (!validatedFields.success) {
			const messageError = organizandoErros(validatedFields.error.errors);
			throw new Error(messageError);
		}
	
		const {email, senha, confirmarSenha} = validatedFields.data;

		if (senha !== confirmarSenha) {
			throw new Error('As senhas devem ser iguais');
		}

		const hashedPassword = await bcrypt.hash(senha, 10);

		const user = await findUserByEmail(email);

		if (user) throw new Error("Esse e-mail já está cadastrado! Informe outro")

		await dbConnect();

		const newUser = await User.create({
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