import { updateTaskAction } from "@/lib/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import TaskService from "@/lib/services/TaskService";
import FormEditTask from "@/components/dashboard/edit/FormEditTask";

export default async function EditTaskPage({ params }: { params: { id: string } }) {
  const task = JSON.parse(JSON.stringify(await TaskService.get(params.id)))
  const title = task.title;

  const updateTaskWithId = updateTaskAction.bind(null, task);
  
  if (!task) redirect("/dashboard");

  return (
    <main>
      <FormEditTask task={task}/>
    </main>
  );
}
