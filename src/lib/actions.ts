'use server'

import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs';
import { FormDataCreateTaskSchema, FormDataLoginSchema, FormDataSignupSchema } from "@/lib/schema";
import { zodErrorMessageHelper } from "@/lib/helper";
import { createUser, findUserByEmail } from "@/lib/userServices";
import { cookies } from "next/headers";
import { completeTaskById, createTask, deleteTaskById, getTaskWithId } from '@/lib/taskServices';
import { revalidatePath } from "next/cache";
import AuthService from "@/lib/services/AuthService";

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

		const { email, senha, confirmarSenha } = validatedFields.data;

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

export async function loginUser(state: any, formData: FormData) {
	const validatedFields = FormDataLoginSchema.safeParse({
		email: formData.get('email'),
		senha: formData.get('senha'),
	});

	try {
		if (!validatedFields.success) {
			const messageError = zodErrorMessageHelper(validatedFields.error.errors);
			throw new Error(messageError);
		}

		const { email, senha } = validatedFields.data;

		const user: any = await findUserByEmail(email);

		if (!user) throw new Error('Nenhum usuário com esse email');

		const isMatch = await bcrypt.compare(senha, user?.senha);

		if (!isMatch) throw new Error("Senha está errada");

		const minutes = 15;
		const expires = new Date(Date.now() + minutes * 60000);

		const token = await AuthService.encryptToken(user.email);

		cookies().set("token", token, { expires, httpOnly: true })

	} catch (error: any) {
		return error.message
	}

	redirect('/dashboard');
}

export async function createTaskAction(state: any, formData: FormData) {
	const validatedFields = FormDataCreateTaskSchema.safeParse({
		title: formData.get("title")
	});

	if (!validatedFields.success) {
		const messageError = zodErrorMessageHelper(validatedFields.error.errors);
		throw new Error(messageError);
	}

	const { title } = validatedFields.data;

	const userEmail = await AuthService.getEmailFromToken();

	if (!userEmail) return redirect('/login');

	const user = await findUserByEmail(userEmail);

	if (!user) return redirect('/login');

	const task = await createTask({ title, user: user._id });

	revalidatePath('/dashboard');
}

export async function deleteTaskAction(id: string) {
	const deletedTask = await deleteTaskById(id);

	revalidatePath('/dashboard');
}

export async function changeCompleteStatusTask(id: string) {
	await completeTaskById(id);
}

export async function updateTaskAction(id: string, formData: FormData,) {
	const validatedFields = FormDataCreateTaskSchema.safeParse({
		title: formData.get("title")
	});

	if (!validatedFields.success) {
		const messageError = zodErrorMessageHelper(validatedFields.error.errors);
		throw new Error(messageError);
	}

	const { title } = validatedFields.data;

	console.log(title, id);

	const task = await getTaskWithId(id);

	task.title = title;
	await task.save();

	revalidatePath('/dashboard');
	redirect('/dashboard');
}