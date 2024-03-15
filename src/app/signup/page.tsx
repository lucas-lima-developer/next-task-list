import { createUser } from "@/lib/actions";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <form className={styles["login-box"]} action={createUser}>
          <h1>Signup</h1>
          <div className={styles["login-input"]}>
            <input type="text" placeholder="E-mail" />
          </div>
          <div className={styles["login-input"]}>
            <input type="password" placeholder="Senha" />
          </div>
          <div className={styles["login-input"]}>
            <input type="password" placeholder="Confirmar senha" />
          </div>
          <div className={styles["login-button"]}>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </main>
  );
}
