"use client";

import Link from "next/link";

import styles from "@/components/profile/Profile.module.css";
import { deleteUserAction } from "@/lib/actions";

interface ProfileProps {
  email: string;
  allTasks: number;
  allCompletedTasks: number;
}

export default function Profile({
  email,
  allTasks,
  allCompletedTasks,
}: ProfileProps) {
  // Email  do usuário (feito)
  // Quantidade de tarefas produzidas (feito)
  // Quantidade de tarefas concluídas (feito)
  // Botão mudar email -> Página que muda email
  // Botão mudar senha -> Página que muda senha
  // Botão apagar conta -> Pop up que pede a senha atual para deletar a conta
  return (
    <div className={styles.box}>
      <div>
        <p>
          <b>Email:</b> {email}
        </p>
        <p>
          <b>Número total de tarefas:</b> {allTasks}
        </p>
        <p>
          <b>Número total de tarefas concluídas:</b> {allCompletedTasks}
        </p>
        <Link href={`/profile/email`}>
          <button>Mudar email</button>
        </Link>
        <Link href={`profile/senha`}>
          <button>Mudar senha</button>
        </Link>
        <button onClick={async () => {
          await deleteUserAction(email)
        }}>Apagar conta</button>
      </div>
    </div>
  );
}
