import mongoose from "mongoose";

export default interface TaskInterface extends mongoose.Document{
  _id: mongoose.Types.ObjectId,
  title: string,
  isComplete: boolean,
  userId: mongoose.Types.ObjectId,
  createdAt: Date
};