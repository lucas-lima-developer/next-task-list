import styles from "@/app/dashboard/page.module.css";
import FormCriarTarefa from "./FormCriarTarefa";
import ListaTarefas from "@/app/dashboard/ListaTarefas";
import AuthService from "@/lib/services/AuthService";
import TaskService from "@/lib/services/TaskService";
import UserService from "@/lib/services/UserService";

export default async function Home() {
  const email = await AuthService.getEmailFromToken();
  const user = JSON.parse(JSON.stringify(await UserService.findByEmail(email!)));


  const tasks = await TaskService.getAll(user._id);

  const tasksConverted = tasks.map((task) => {
    return {
      title: task.title,
      isComplete: task.isComplete,
      _id: String(task._id),
      createdAt: task.createdAt,
      user: String(task.user),
    };
  });

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
        </header>
        <main className={styles.main}>
          <FormCriarTarefa />
          <ListaTarefas tasks={tasksConverted} />
        </main>
      </div>
    </>
  );
}
