import AuthService from "@/lib/services/AuthService";
import TaskService from "@/lib/services/TaskService";
import UserService from "@/lib/services/UserService";
import HeaderLinks from "@/components/header/HeaderLinks";
import FormCreateTask from "@/components/dashboard/FormCreateTask";
import TaskList from "@/components/dashboard/TaskList";

export default async function Home() {
  const email = await AuthService.getEmailFromToken();
  const user = JSON.parse(
    JSON.stringify(await UserService.findByEmail(email!))
  );

  const tasks = JSON.parse(JSON.stringify(await TaskService.getAll(user._id)));

  return (
    <>
      <main>
        <FormCreateTask />
        <TaskList tasks={tasks} />
      </main>
    </>

  );
}
