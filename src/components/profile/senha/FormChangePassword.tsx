"use client";

import { updateUserPasswordAction } from "@/lib/actions";
import { useFormState } from "react-dom";
import styles from "@/components/profile/senha/FormChangePassword.module.css";

interface FormChangePasswordProps {
  email: string;
}

export default function FormChangePassword({ email }: FormChangePasswordProps) {
  const [state, formAction] = useFormState(updateUserPasswordAction, null);

  return (
    <form className={styles.form} action={formAction}>
      <input
        className={styles.input}
        type="password"
        name="oldPassword"
        placeholder="Senha atual..."
      />
      <input
        className={styles.input}
        type="password"
        name="newPassword"
        placeholder="Nova senha..."
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
