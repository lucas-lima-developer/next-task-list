"use client";

import { updateUserEmailAction } from "@/lib/actions";
import { useFormState } from "react-dom";
import styles from "@/components/profile/email/FormChangeEmail.module.css";

interface FormChangeEmailProps {
  email: string;
}

export default function FormChangeEmail({ email }: FormChangeEmailProps) {
  const [state, formAction] = useFormState(updateUserEmailAction, null);

  return (
    <form className={styles.form} action={formAction}>
      <input
        className={styles.input}
        type="email"
        name="oldEmail"
        placeholder="Email atual..."
      />
      <input
        className={styles.input}
        type="email"
        name="newEmail"
        placeholder="Novo email..."
      />
      <input type="hidden" name="email" value={email} />
      <div>
        <button className={styles.submit} type="submit">
          Atualizar
        </button>
      </div>
      {state != null && (
        <div className={styles.errorBox}>
          <p className={styles.errorMessage}>{state}</p>
        </div>
      )}
    </form>
  );
}
