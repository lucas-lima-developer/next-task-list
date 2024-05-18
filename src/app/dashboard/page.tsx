import styles from "@/app/dashboard/page.module.css";
import ListaTarefas from "@/app/dashboard/ListaTarefas";
import AuthService from "@/lib/services/AuthService";
import TaskService from "@/lib/services/TaskService";
import UserService from "@/lib/services/UserService";
import HeaderLinks from "@/components/header/HeaderLinks";
import FormCreateTask from "@/components/dashboard/FormCreateTask";

export default async function Home() {
  const email = await AuthService.getEmailFromToken();
  const user = JSON.parse(
    JSON.stringify(await UserService.findByEmail(email!))
  );

  const tasks = JSON.parse(JSON.stringify(await TaskService.getAll(user._id)));

  return (
    <>
      <HeaderLinks />
      <main>
        <FormCreateTask />
        <ListaTarefas tasks={tasks} />
      </main>
    </>
  );
}
