import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";
import { TaskCardProps } from "../utils/types";
import { deleteTask } from "../api/task";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskForm from "./TaskForm";
import { Tooltip } from "react-tooltip";

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  setTasks,
  onTaskDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
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

  const token = localStorage.getItem("token") || "";
  const handleDelete = async (id: string) => {
    try {
      if (taskToDelete) {
        const response = await deleteTask(id, token);
        if (response.success) {
          toast.success("Task deleted successfully!");
          onTaskDelete(id);
        } else {
          toast.error(response || "Failed to delete task.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (updatedTask: any) => {
    setTasks((prev: any) =>
      prev.map((item: any) =>
        item._id === updatedTask._id ? updatedTask : item
      )
    );
  };

  return (
    <>
      {isEditing ? (
        <TaskForm
          initialTaskData={task}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)}
          isEditing={isEditing}
        />
      ) : (
        // <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 transition-all hover:shadow-lg">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 transition-all hover:shadow-lg flex-grow-0 h-auto min-h-[200px]">

          <div className="flex justify-between items-center">
            <h3
              id={`task-title-${task._id}`}
              className="text-xl font-semibold truncate max-w-[75%] cursor-pointer"
            >
              {task.title.length > 25
                ? `${task.title.slice(0, 25)}...`
                : task.title}
            </h3>
            <Tooltip anchorSelect={`#task-title-${task._id}`} place="top">
              {task.title}
            </Tooltip>
            <span
              className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
                statusColors[task.status]
              }`}
            >
              {task.status}
            </span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 whitespace-normal break-words h-[40px] ">
            {task?.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaExclamationCircle
                className={`text-white p-1 w-6 h-6 rounded-full ${
                  priorityColors[task?.priority]
                }`}
              />
              <span className="text-sm font-medium">
                {task?.priority} Priority
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaCalendarAlt />
              <span>{new Date(task.due_date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 cursor-pointer text-white px-3 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => {
                setTaskToDelete(task._id);
                setIsModalOpen(true);
              }}
              className="bg-red-500 cursor-pointer text-white px-3 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition"
            >
              <FaTrash /> Delete
            </button>
          </div>
          <ToastContainer autoClose={3000} />
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center  z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure want to Delete?
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
