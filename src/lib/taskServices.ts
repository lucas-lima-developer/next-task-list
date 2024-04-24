'use server'

import dbConnect from "@/lib/dbConnect";
import Task, { TaskArray } from '@/models/Task'
import { Schema } from "mongoose";
import { UserDocument } from "@/lib/userServices";
import { revalidatePath } from "next/cache";

export async function createTask(task: { title:string, user: Schema.Types.ObjectId }) {
  await dbConnect();

  const taskCreate = await Task.create(task);

  return taskCreate;
}

export async function getTaskWithId(id: string) {
  await dbConnect();

  const task = await Task.findById(id);

  return task;
}

export async function deleteTaskById(id: string) {
  await dbConnect();

  const taskDeleted = await Task.findByIdAndDelete(id);

  return taskDeleted;
}

export async function getAllTasksFromUser(user: UserDocument) : Promise<TaskArray> {
  await dbConnect();

  const tasks = await Task.find({ user: user._id });

  return tasks;
}

export async function completeTaskById(id: string) {
  await dbConnect();

  const task = await Task.findById(id);

  if (!task) throw new Error('Tarefa não encontrada');

  task.isComplete = !task.isComplete;

  await task.save();

  revalidatePath('/dashboard');
}