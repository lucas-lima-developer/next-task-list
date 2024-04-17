"use client";

import { deleteTaskAction } from "@/lib/actions";
import styles from "./page.module.css";

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

  return (
    <li className={styles["task-item"]}>
      <span>{task.title}</span>
      <form action={deleteTaskWithId}>
        <button className={styles["task-button"]}>X</button>
      </form>
    </li>
  );
}
