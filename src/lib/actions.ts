'use server'

import User from "@/models/User"
import dbConnect from "./dbConnect"
import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs';

async function findUserByEmail(email: any) {
	await dbConnect();

	const user = await User.findOne({ email }).lean();

	return user;
}

export async function signupUser(formData: FormData) {
	const email= formData.get('email')?.toString();
	const senha = formData.get('senha')?.toString();
	const confirmarSenha = formData.get('confirmarSenha')?.toString();

	try {
		if (!email || !senha || !confirmarSenha || senha !== confirmarSenha) {
			throw new Error('Por favor, forneça um email válido e as senhas devem ser iguais');
		}

		const hashedPassword = await bcrypt.hash(senha, 10);

		const user = await findUserByEmail(email);

		if (user) throw new Error("Esse e-mail já está cadastrado!")

		await dbConnect();

		const newUser = await User.create({
			email,
			senha: hashedPassword
		});

		if (!newUser) throw new Error("Alguma coisa deu errado, entre em contato com o suporte.");
	} catch (error: any) {
		console.log(error.message);
		return 
	}

	redirect('/login');
}

// TODO Criar Lógica do login, mandando para a '/' quando for autenticado