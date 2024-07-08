import Profile from "@/components/profile/Profile";
import AuthService from "@/lib/services/AuthService";
import TaskService from "@/lib/services/TaskService";
import UserService from "@/lib/services/UserService";
import TaskInterface from "@/lib/interfaces/Task";

export default async function ProfilePage() {
  const email = await AuthService.getEmailFromToken();
  const user = JSON.parse(
    JSON.stringify(await UserService.findByEmail(email!))
  );

  const tasks = JSON.parse(JSON.stringify(await TaskService.getAll(user._id)));

  const tasksCompletedLenght = tasks.filter((tarefa : TaskInterface) => tarefa.isComplete).length;

  return (
    <>
      <Profile email={email} allTasks={tasks.length} allCompletedTasks={tasksCompletedLenght}/>
    </>
  );
}
