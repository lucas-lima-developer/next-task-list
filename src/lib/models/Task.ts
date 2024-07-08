import mongoose, { Schema } from "mongoose";
import Task from "@/lib/interfaces/Task";

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
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
});

export default mongoose.models.Task || mongoose.model<Task>("Task", TaskSchema);
