"use client";
import { useFormState } from "react-dom";
import styles from "./page.module.css";
import { createTaskAction } from "@/lib/actions";

export default function FormCriarTarefa() {
  const [state, formAction] = useFormState(createTaskAction , null)

  return (
    <>
      <form className="form" action={formAction}>
        <input
          type="text"
          className={styles["text-input"]}
          placeholder="Nova tarefa"
          name="title"
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
