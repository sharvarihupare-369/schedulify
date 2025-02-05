import React from "react";
import {
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";
import { TaskProps } from "../utils/types";

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const priorityColors: Record<string, string> = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  const statusColors: Record<string, string> = {
    "To do": "bg-gray-400",
    "In Progress": "bg-blue-500",
    Completed: "bg-green-500",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <span
          className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2">{task?.description}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaExclamationCircle
            className={`text-white p-1 w-6 h-6 rounded-full ${
              priorityColors[task?.priority]
            }`}
          />
          <span className="text-sm font-medium">{task?.priority} Priority</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <FaCalendarAlt />
          <span>{new Date(task.due_date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="bg-blue-500 cursor-pointer text-white px-3 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition">
          <FaEdit /> Edit
        </button>
        <button className="bg-red-500 cursor-pointer text-white px-3 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition">
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
