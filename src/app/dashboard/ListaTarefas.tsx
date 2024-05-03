"use client";

import { deleteTaskAction, updateIsCompleteAction } from "@/lib/actions";
import styles from "@/app/dashboard/page.module.css";
import Link from "next/link";

export type TaskProps = {
  title: string;
  isComplete: boolean;
  _id: string;
  createdAt: Date;
  user: string;
};

type Props = {
  tasks: TaskProps[];
};

export default function ListaTarefas({ tasks }: Props) {
  return (
    <ul className={styles["task-list"]}>
      {tasks.map((task) => (
        <TaskComponent task={task} key={task._id} />
      ))}
    </ul>
  );
}

function TaskComponent({ task }: { task: TaskProps }) {
  const deleteTaskWithId = deleteTaskAction.bind(null, task._id);

  const taskClass = task.isComplete
    ? `${styles["task-item"]} ${styles.completed}`
    : `${styles["task-item"]}`;

  return (
    <li className={taskClass}>
      <div
        onClick={async () => {
          await updateIsCompleteAction(task._id, !task.isComplete);
        }}
      >
        <span>{task.title}</span>
      </div>
      <div>
        <button className={styles["edit-button"]}>
          <Link href={`/dashboard/${task._id}/edit`}>Atualizar</Link>
        </button>
        <form action={deleteTaskWithId}>
          <button className={styles["task-button"]}>X</button>
        </form>
      </div>
    </li>
  );
}
