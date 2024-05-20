"use client";

import { IoCheckbox } from "react-icons/io5";
import { IoCheckboxOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import TaskInterface from "@/lib/interfaces/Task";
import styles from "@/components/dashboard/TaskList.module.css";
import {
  deleteTaskAction,
  updateIsCompleteAction,
  updateTaskAction,
} from "@/lib/actions";
import Link from "next/link";

export default function TaskList({ tasks }: { tasks: TaskInterface[] }) {
  return (
    <div className={styles.list}>
      <ul>
        {tasks.map((task) => {
          const taskDate = new Date(task.createdAt);

          const date = taskDate.toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
          });
          const time = taskDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <li key={task._id.toString()} className={styles.task}>
              <p
                className={`${styles.title} ${
                  task.isComplete ? styles.outline : null
                }`}
                onClick={async () => {
                  await updateIsCompleteAction(
                    task._id.toString(),
                    !task.isComplete
                  );
                }}
              >
                {task.title}
              </p>
              <div className={styles.bottomHelper}>
                <p className={styles.date}>
                  {time} {date}
                </p>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.button} ${styles.updateButton}`}
                    onClick={async () => {
                      await updateIsCompleteAction(
                        task._id.toString(),
                        !task.isComplete
                      );
                    }}
                  >
                    {task.isComplete ? <IoCheckbox /> : <IoCheckboxOutline />}
                  </button>
                  <button className={`${styles.button} ${styles.updateButton}`}>
                    <Link href={`/dashboard/${task._id.toString()}/edit`}>
                      <LuPencil />
                    </Link>
                  </button>
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={async () => {
                      await deleteTaskAction(task._id.toString());
                    }}
                  >
                    <LuTrash />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
