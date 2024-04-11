import { getEmailFromToken } from "@/lib/authServices";
import { redirect } from "next/navigation";

export default async function Home() {
  const email = await getEmailFromToken();

  if (!email) {
    redirect('/login')
  }

  return (
    <main>
      {/* TODO Página onde deve ficar o Dahsboard com as tarefas */}
      <h1>Dashboard</h1>
      <p>{email}</p>
    </main>
  );
}