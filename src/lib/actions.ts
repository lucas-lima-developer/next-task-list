'use server'

import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs';
import { FormDataCreateTaskSchema, FormDataLoginSchema, FormDataSignupSchema, FormDataUpdateTaskSchema, FormDataUpdateUserEmail } from "@/lib/schema";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import AuthService from "@/lib/services/AuthService";
import TaskService from "@/lib/services/TaskService";
import UserService from "@/lib/services/UserService";
import HelperService from "@/lib/services/HelperService";

export async function signupUser(state: any, formData: FormData) {

	const validatedFields = FormDataSignupSchema.safeParse({
		email: formData.get('email'),
		senha: formData.get('senha'),
		confirmarSenha: formData.get('confirmarSenha')
	});

	try {
		if (!validatedFields.success) {
			const messageError = HelperService.zodErrorMessageFormat(validatedFields.error.errors);
			throw new Error(messageError);
		}

		const { email, senha, confirmarSenha } = validatedFields.data;

		if (senha !== confirmarSenha) {
			throw new Error('As senhas devem ser iguais');
		}

		const hashedPassword = await bcrypt.hash(senha, 10);

		const user = await UserService.findByEmail(email);

		if (user) throw new Error("Esse e-mail já está cadastrado! Informe outro.")

		const newUser = await UserService.create({
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
			const messageError = HelperService.zodErrorMessageFormat(validatedFields.error.errors);
			throw new Error(messageError);
		}

		const { email, senha } = validatedFields.data;

		const user: any = await UserService.findByEmail(email);

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

export async function logoutUserAction() {
	AuthService.removeTokenFromCookies();

	redirect('/login');
}

export async function createTaskAction(state: any, formData: FormData) {
	const validatedFields = FormDataCreateTaskSchema.safeParse({
		title: formData.get("title")
	});

	if (!validatedFields.success) {
		const messageError = HelperService.zodErrorMessageFormat(validatedFields.error.errors);
		throw new Error(messageError);
	}

	const { title } = validatedFields.data;

	const userEmail = await AuthService.getEmailFromToken();

	if (!userEmail) return redirect('/login');

	const user = await UserService.findByEmail(userEmail);

	if (!user) return redirect('/login');

	const task = await TaskService.create({ title, userId: user._id });

	revalidatePath('/dashboard');
}

export async function deleteTaskAction(id: string) {
	await TaskService.delete(id);

	revalidatePath('/dashboard');
}

export async function updateTaskAction(state: any, formData: FormData) {
	const validatedFields = FormDataUpdateTaskSchema.safeParse({
		title: formData.get("title"),
		taskId: formData.get("taskId")
	});

	if (!validatedFields.success) {
		const messageError = HelperService.zodErrorMessageFormat(validatedFields.error.errors);
		throw new Error(messageError);
	}

	const { taskId, title } = validatedFields.data;

	await TaskService.updateTitle(taskId, title);

	revalidatePath('/dashboard');
	redirect('/dashboard');
}

export async function updateIsCompleteAction(id: string, isComplete: boolean) {
	await TaskService.updateIsCompleted(id, isComplete);

	revalidatePath('/dashboard');
}

export async function updateUserEmailAction(state: any, formData: FormData) {
	const validatedFields = FormDataUpdateUserEmail.safeParse({
		email: formData.get("email"),
		newEmail: formData.get("newEmail"),
	})

	if (!validatedFields.success) {
		const messageError = HelperService.zodErrorMessageFormat(validatedFields.error.errors);
		throw new Error(messageError);
	}

	const { email, newEmail } = validatedFields.data;

	await UserService.updateUserEmail(email, newEmail);

	const minutes = 15;
	const expires = new Date(Date.now() + minutes * 60000);

	const token = await AuthService.encryptToken(newEmail);

	cookies().set("token", token, { expires, httpOnly: true })

	revalidatePath('/profile');
	redirect('/profile');
}