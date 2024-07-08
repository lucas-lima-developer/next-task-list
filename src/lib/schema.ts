import email from "next-auth/providers/email";
import { z } from "zod";

export const FormDataSignupSchema = z.object({
  email: z.string().email({ message: 'O email é necessário' }),
  senha: z.string().min(5, { message: 'A senha deve ter mais de 5 caracteres' }),
  confirmarSenha: z.string()
});

export const FormDataLoginSchema = z.object({
  email: z.string().email({ message: 'O email é necessário' }),
  senha: z.string().min(1, { message: 'A senha é necessária' })
});

export const FormDataCreateTaskSchema = z.object({
  title: z.string().min(1, { message: 'Nome da tarefa é necessário' }),
});

export const FormDataUpdateTaskSchema = z.object({
  title: z.string().min(1, { message: 'Nome da tarefa é necessário' }),
  taskId: z.string().min(1, { message: 'Id da tarefa é necessário' })
});

export const FormDataUpdateUserEmail = z.object({
  newEmail: z.string().email({ message: 'O email é necessário' }),
  email: z.string().email()
});