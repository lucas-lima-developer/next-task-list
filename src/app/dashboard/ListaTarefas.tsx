import { TaskArray } from "@/models/Task";
import styles from "./page.module.css";

export default function ListaTarefas({ tasks }: { tasks: TaskArray }) {
  return (
    <>
      <ul className={styles["task-list"]}>
            {tasks.map((task) => (
              <li key={task._id} className={styles["task-item"]}>
                {task.title}
              </li>
            ))}
          </ul>
    </>
  )
}