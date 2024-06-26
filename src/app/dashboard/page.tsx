import { getEmailFromToken } from "@/lib/authServices";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import FormCriarTarefa from "./FormCriarTarefa";
import { findUserByEmail } from "@/lib/userServices";
import { getAllTasksFromUser } from "@/lib/taskServices";
import ListaTarefas from "./ListaTarefas";

export default async function Home() {
  const email = await getEmailFromToken();
  const user = await findUserByEmail(email);

  if (!email || !user) {
    redirect("/login");
  }

  const tasks = await getAllTasksFromUser(user);

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
