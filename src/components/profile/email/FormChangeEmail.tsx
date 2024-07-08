"use client";

import { updateUserEmailAction } from "@/lib/actions";
import { useFormState } from "react-dom";

interface FormChangeEmailProps {
  email: string;
}

export default function FormChangeEmail({ email }: FormChangeEmailProps) {
  const [state, formAction] = useFormState(updateUserEmailAction, null);

  return (
    <>
      <form action={formAction}>
        <input type="email" name="newEmail" placeholder="Novo email..." />
        <input type="hidden" name="email" value={email}/>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
