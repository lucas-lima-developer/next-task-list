"use client";

import { loginUser } from "@/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import styles from "@/components/login/page.module.css";

export default function LoginForm() {
  const [state, formAction] = useFormState(loginUser, null);

  return (
    <>
      <main className={styles.main}>
        <form className={styles.form} action={formAction}>
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input type="email" placeholder="E-mail" name="email" required/>
          </div>
          <div className={styles.inputBox}>
            <input type="password" placeholder="Senha" name="senha" required />
          </div>
          {state && (
            <div className={styles.errorBox}>
              <p className={styles.errorMessage}>{state}</p>
            </div>
          )}
          <div className={styles.buttonBox}>
            <button>Entrar</button>
          </div>
          <p>
            Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
          </p>
        </form>
      </main>
    </>
  );
}
