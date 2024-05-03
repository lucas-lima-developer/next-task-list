import { updateTaskAction } from "@/lib/actions";
import { redirect } from "next/navigation";
import styles from "@/app/dashboard/page.module.css";
import Link from "next/link";
import TaskService from "@/lib/services/TaskService";

export default async function Home({ params }: { params: { id: string } }) {
  const id = params.id;

  const task = JSON.parse(JSON.stringify(await TaskService.get(id)))
  const title = task.title;

  const updateTaskWithId = updateTaskAction.bind(null, task);
  

  if (!task) redirect("/dashboard");

  return (
    <main className={styles.main}>
      <form className="form" action={updateTaskWithId}>
        <input
          type="text"
          className={styles["text-input"]}
          placeholder="Nova tarefa"
          name="title"
          defaultValue={title}
        />
        <div className={styles["div-centralizada"]}>
          <button type="submit" className={styles["submit-button"]}>
            Atualizar
          </button>
          <button className={styles["back-button"]}>
            <Link href={`/dashboard/`}>Voltar</Link>
          </button>
        </div>
      </form>
    </main>
  );
}
