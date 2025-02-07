import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { TaskFormProps } from "../utils/types";
import { createTask } from "../api/task";
import { RxCross2 } from "react-icons/rx";

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const token = localStorage.getItem("token") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      status,
      priority,
      due_date: dueDate,
    };

    if (!token) {
      toast.error("You must be logged in to create a task.");
      return;
    }

    const response = await createTask(newTask, token);
    console.log(response, "response");
    if (response.success) {
      toast.success("Task created successfully!");
      onTaskCreated(response.data);
      onClose();
    } else {
      toast.error(response);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <div className="mb-4 flex  justify-between items-center">
          <h2 className="text-xl font-bold ">Create Task</h2>
          <RxCross2 onClick={onClose} style={{ cursor: "pointer" }} size={23} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className=" text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Create
          </button>
        </form>
        <button
          className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default TaskForm;
