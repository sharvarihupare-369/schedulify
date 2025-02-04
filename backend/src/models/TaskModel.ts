import mongoose, { Document, Schema } from "mongoose";

interface Task extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: "To do" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  due_date?: Date;
}

const taskSchema: Schema<Task> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, minlength: 10, maxlength: 500 },
    status: {
      type: String,
      enum: ["To do", "In Progress", "Completed"],
      default: "To do",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    due_date: {
      type: Date,
      default: Date.now,
      validate: {
        validator: (value: Date) => value.getTime() >= Date.now(),
        message: "Due date must be in future.",
      },
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<Task>("task", taskSchema);

export default TaskModel;
