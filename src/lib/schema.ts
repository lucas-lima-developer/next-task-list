import { z } from "zod";

export const FormDataSignupSchema = z.object({
  email: z.string().email({ message: 'O email é necessário' }),
  senha: z.string().min(5, { message:  'A senha deve ter mais de 5 caracteres' }),
  confirmarSenha: z.string()
});

export const FormDataLoginSchema = z.object({
  email: z.string().email({ message: 'O email é necessário' }),
  senha: z.string().min(1, { message:  'A senha é necessária' })
});