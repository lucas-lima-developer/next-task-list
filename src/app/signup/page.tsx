import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles["login-box"]}>
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
            <button>Cadastrar</button>
          </div>
        </div>
      </div>
    </main>
  );
}
