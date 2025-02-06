import mongoose, { Document, Schema } from "mongoose";

interface Task extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: "To do" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  due_date: Date;
  deletedAt: Date;
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
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String },
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
      required: true,
      default: Date.now,
      validate: {
        validator: (value: Date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value.getTime() >= today.getTime();
        },
        message: "Due date must be in future.",
      },
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<Task>("task", taskSchema);

export default TaskModel;
