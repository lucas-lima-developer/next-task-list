import Link from "next/link";
import styles from "./page.module.css";

//TODO Criar lógica do Login, trasformando em formulário
export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles["login-box"]}>
          <h1>Login</h1>
          <div className={styles["login-input"]}>
            <input type="text" placeholder="E-mail" />
          </div>
          <div className={styles["login-input"]}>
            <input type="password" placeholder="Senha" />
          </div>
          <div className={styles["login-button"]}>
            <button>Entrar</button>
          </div>
          <p>Não tem uma conta? <Link href="/signup">Cadastre-se</Link></p>
        </div>
      </div>
    </main>
  );
}
