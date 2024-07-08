"use client";

import { signupUser } from "@/lib/actions";
import { useFormState } from "react-dom";
import styles from "@/components/signup/page.module.css";
import Link from "next/link";

export default function SignupForm() {
  const [state, formAction] = useFormState(signupUser, null);

  return (
    <main className={styles.main}>
      <form className={styles.form} action={formAction}>
        <h1>Signup</h1>
        <div className={styles.inputBox}>
          <input type="email" placeholder="E-mail" name="email" required />
        </div>
        <div className={styles.inputBox}>
          <input type="password" placeholder="Senha" name="senha" required />
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Confirmar senha"
            name="confirmarSenha"
            required
          />
        </div>
        {state && (
          <div className={styles.errorBox}>
            <p className={styles.errorMessage}>{state}</p>
          </div>
        )}
        <div className={styles.buttonBox}>
          <button>Cadastrar</button>
        </div>
        <p>
          Já possui outra conta? Faça o <Link href="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
