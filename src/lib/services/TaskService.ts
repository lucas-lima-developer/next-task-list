import { Schema } from "mongoose";
import DatabaseService from "@/lib/services/DatabaseService";
import Task from "@/lib/models/Task";
import TaskInterface from "@/lib/interfaces/Task";

export default class TaskService {
  static async create(task: { title: string, userId: Schema.Types.ObjectId }): Promise<TaskInterface> {
    await DatabaseService.connect();

    const taskCreated = await Task.create(task);

    if (!taskCreated) throw new Error("Não foi possível criar a tarefa.")

    return taskCreated;
  }

  static async get(id: string): Promise<TaskInterface> {
    await DatabaseService.connect();

    const task = await Task.findById(id);

    if (!task) throw new Error(`Não foi encontrado tarefa com id = ${id}.`);

    return task;
  }

  static async delete(id: string) {
    await DatabaseService.connect();

    try {
      const task = await TaskService.get(id);
      await task.deleteOne();
    } catch (error) {
      throw new Error(`Não foi possível deletar tarefa ${id}`);
    }
  }

  static async getAll(userId: string): Promise<TaskInterface[]> {
    const tasks = await Task.find({ userId });

    return tasks;
  }

  static async updateTitle(id: string, title: string) : Promise<void> {
    const task = await Task.findById(id);

    task.title = title;
    await task.save();
  }

  static async updateIsCompleted(id: string, isComplete: boolean) : Promise<void> {
    const task = await Task.findById(id);

    task.isComplete = isComplete;
    await task.save();
  }
}