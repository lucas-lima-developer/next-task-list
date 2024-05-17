import styles from "@/app/dashboard/page.module.css";
import FormCriarTarefa from "./FormCriarTarefa";
import ListaTarefas from "@/app/dashboard/ListaTarefas";
import AuthService from "@/lib/services/AuthService";
import TaskService from "@/lib/services/TaskService";
import UserService from "@/lib/services/UserService";
import LinkHeader from "./LinkHeader";

export default async function Home() {
  const email = await AuthService.getEmailFromToken();
  const user = JSON.parse(
    JSON.stringify(await UserService.findByEmail(email!))
  );

  const tasks = JSON.parse(JSON.stringify(await TaskService.getAll(user._id)));

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <LinkHeader />
        </header>
        <main className={styles.main}>
          <FormCriarTarefa />
          <ListaTarefas tasks={tasks} />
        </main>
      </div>
    </>
  );
}
