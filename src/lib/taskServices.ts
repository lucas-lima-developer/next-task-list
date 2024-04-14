'use server'

import dbConnect from "./dbConnect";
import Task, { TaskArray } from '../models/Task'
import { Schema } from "mongoose";
import { UserDocument } from "./userServices";

export async function createTask(task: { title:string, user: Schema.Types.ObjectId }) {
  await dbConnect();

  const taskCreate = await Task.create(task);

  return taskCreate;
}

export async function getAllTasksFromUser(user: UserDocument) : Promise<TaskArray> {
  await dbConnect();

  const tasks = await Task.find({ user: user._id });

  return tasks;
}