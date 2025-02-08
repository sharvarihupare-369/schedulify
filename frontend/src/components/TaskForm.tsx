import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskFormProps } from "../utils/types";
import { createTask, editTask } from "../api/task";
import { RxCross2 } from "react-icons/rx";

const TaskForm: React.FC<TaskFormProps> = ({
  onClose,
  onTaskCreated,
  initialTaskData,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const [task, setTask] = useState(
    initialTaskData || {
      title: "",
      description: "",
      priority: "Medium",
      status: "To do",
      due_date: "",
    }
  );

  useEffect(() => {
    if (initialTaskData) {
      setTask(initialTaskData);
    }
  }, [initialTaskData]);
  const token = localStorage.getItem("token") || "";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response;

    try {
      if (initialTaskData?.title) {
        response = await editTask(task._id, token, task);
        if (response.success) {
          toast.success("Task updated successfully!");
          onSubmit && onSubmit(response.data);
          onCancel && onCancel();
        } else {
          toast.error(response);
        }
      } else {
        response = await createTask(task, token);
        if (response.success) {
          toast.success("Task created successfully!");
          onTaskCreated && onTaskCreated(response.data);
          onClose && onClose();
        } else {
          toast.error(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // if (response.success) {
  // toast.success("Task created successfully!");
  // };

  return (
    <>
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <div className="mb-4 flex  justify-between items-center">
            <h2 className="text-xl font-bold ">Create Task</h2>
            <RxCross2
              onClick={initialTaskData ? onCancel : onClose}
              style={{ cursor: "pointer" }}
              size={23}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className=" text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={task.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
                value={task.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
                value={task.status}
                onChange={handleChange}
              >
                <option value="To do">To do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                name="due_date"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
                value={task.due_date}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </form>
          <button
            className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default TaskForm;
