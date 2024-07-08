"use client";

import { createTaskAction } from "@/lib/actions";
import { useState } from "react";
import { useFormState } from "react-dom";
import styles from "@/components/dashboard/FormCreateTask.module.css";

export default function FormCreateTask() {
  const [state, formAction] = useFormState(createTaskAction, null);
  const [taskTitle, setTaskTitle] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setTaskTitle("")
  }

  return (
    <form className={styles.form} action={formAction} onSubmit={handleSubmit}>
      <input 
        className={styles.input}
        type="text"
        placeholder="Nova tarefa"
        name="title"
        value={taskTitle}
        onChange={handleInputChange}
      />
      <div>
        <button className={styles.submit}>Adicionar</button>
      </div>
    </form>
  )
}