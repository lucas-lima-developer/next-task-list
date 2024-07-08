import Link from "next/link";

interface ProfileProps {
  email: string,
  allTasks: number,
  allCompletedTasks: number
};

export default function Profile({ email, allTasks, allCompletedTasks }: ProfileProps) {
  // Email  do usuário (feito)
  // Quantidade de tarefas produzidas (feito)
  // Quantidade de tarefas concluídas (feito)
  // Botão mudar email -> Página que muda email
  // Botão mudar senha -> Página que muda senha
  // Botão apagar conta -> Pop up que pede a senha atual para deletar a conta
  return (
    <>
      <p>E-mail: {email}</p>
      <p>Número total de tarefas: {allTasks}</p>
      <p>Número total de tarefas concluídas: {allCompletedTasks}</p>
      <button><Link href={`/profile/email`}>Mudar email</Link></button>
      <button><Link href={`profile/senha`}>Mudar senha</Link></button>
      <button>Apagar conta</button>
    </>
  );
}
