"use client";

import { updateTaskAction } from "@/lib/actions";
import TaskInterface from "@/lib/interfaces/Task";
import Link from "next/link";
import { useFormState } from "react-dom";
import styles from "@/components/dashboard/edit/FormEditTask.module.css";

export default function FormEditTask({ task }: { task: TaskInterface }) {
  const [state, formAction] = useFormState(updateTaskAction, null);

  return (
    <form className={styles.form} action={formAction}>
      <input 
        type="hidden"
        name="taskId"
        value={task._id.toString()}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Título"
        name="title"
        defaultValue={task.title}
      />
      <div>
        <button className={styles.submit} type="submit">Atualizar</button>
        <button className={styles.back}>
          <Link href={"/dashboard"}>Voltar</Link>
        </button>
      </div>
    </form>
  );
}
