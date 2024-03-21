"use client";

import { signupUser } from "@/lib/actions";
import styles from "./page.module.css";
import Link from "next/link"; 
import { useFormState } from "react-dom";

export default function Home() {
  const [state, formAction] = useFormState(signupUser, null);

  return (
    <main>
      <div className={styles.container}>
        <form className={styles["login-box"]} action={formAction}>
          <h1>Signup</h1>
          <div className={styles["login-input"]}>
            <input type="text" placeholder="E-mail" name="email" />
          </div>
          <div className={styles["login-input"]}>
            <input type="password" placeholder="Senha" name="senha" />
          </div>
          <div className={styles["login-input"]}>
            <input
              type="password"
              placeholder="Confirmar senha"
              name="confirmarSenha"
            />
          </div>
          <p className={styles['login-error-message']}>{state}</p>
          <div className={styles["login-button"]}>
            <button type="submit">Cadastrar</button>
          </div>
          <p>
            Já possui conta? Faça o <Link href="/login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
