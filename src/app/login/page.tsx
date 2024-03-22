"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useFormState } from "react-dom";
import { loginUser } from "@/lib/actions";

export default function Home() {
  const [state, formAction] = useFormState(loginUser, null);

  return (
    <main>
      <div className={styles.container}>
        <form className={styles["login-box"]} action={formAction}>
          <h1>Login</h1>
          <div className={styles["login-input"]}>
            <input type="text" placeholder="E-mail" name="email" />
          </div>
          <div className={styles["login-input"]}>
            <input type="password" placeholder="Senha" name="senha" />
          </div>
          <div className={styles["login-button"]}>
            <button>Entrar</button>
          </div>
          <p className={styles["login-error-message"]}>{state}</p>
          <p>
            Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
