import { updateTaskAction } from "@/lib/actions";
import { getTaskWithId } from "@/lib/taskServices";
import { redirect } from "next/navigation";
import styles from "../../page.module.css";
import Link from "next/link";

export default async function Home({ params }: { params: { id: string } }) {
  const id = params.id;

  const task = await getTaskWithId(id);
  const title = task.title;

  const updateTaskWithId = updateTaskAction.bind(null, id);

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
