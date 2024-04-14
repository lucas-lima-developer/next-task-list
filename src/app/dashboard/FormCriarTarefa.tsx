"use client";
import { useFormState } from "react-dom";
import styles from "./page.module.css";
import { createTaskAction } from "@/lib/actions";
import { useState } from "react";

export default function FormCriarTarefa() {
  const [state, formAction] = useFormState(createTaskAction , null);
  const [taskTitle, setTaskTitle] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setTaskTitle('');
  }

  return (
    <>
      <form className="form" action={formAction} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles["text-input"]}
          placeholder="Nova tarefa"
          name="title"
          value={taskTitle}
          onChange={handleInputChange}
        />
        <div className={styles["div-centralizada"]}>
          <button type="submit" className={styles["submit-button"]}>
            Adicionar
          </button>
        </div>
      </form>
    </>
  );
}
