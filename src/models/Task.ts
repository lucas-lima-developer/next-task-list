import mongoose, { Schema } from "mongoose";

export interface Task extends mongoose.Document {
  title: string;
  isComplete: boolean;
  createdAt: Date;
  user: mongoose.Types.ObjectId;
}

export type TaskArray = Task[];

const TaskSchema = new mongoose.Schema<Task>({
  title: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
});

export default mongoose.models.Task || mongoose.model<Task>("Task", TaskSchema);
