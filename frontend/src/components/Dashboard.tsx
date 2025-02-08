import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { fetchAllTasks } from "../api/task";
import { DashboardTask, TaskP } from "../utils/types";
import Loader from "./Loader";

const Dashboard: React.FC<DashboardTask> = ({
  tasks,
  setTasks,
  onTaskDelete,
  priority,
  status,
  setPriority,
  setStatus,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = localStorage.getItem("token") || "";
  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllTasks(token);
        setTasks(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchedData();
  }, [setTasks]);

  const filteredTasks = tasks.filter((task: TaskP) => {
    const prioritySelected = priority
      ? task.priority.toLowerCase() === priority.toLowerCase()
      : true;
    const statusSelected = status
      ? task.status.toLowerCase() === status.toLowerCase()
      : true;
    return prioritySelected && statusSelected;
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex items-center gap-8 flex-col md:flex-row lg:flex-row xl:flex-row">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex gap-10 flex-col md:flex-row lg:flex-row xl:flex-row">
          <select
            className="border border-gray-300 pl-0 pr-10 py-1 rounded-md outline-none cursor-pointer"
            value={priority}
            onChange={(e) => setPriority!(e.target.value)}
          >
            <option value={""}>All Priorities</option>
            <option value={"High"}>High</option>
            <option value={"Medium"}>Medium</option>
            <option value={"Low"}>Low</option>
          </select>
          <select
            className="border border-gray-300 pl-0 pr-10 py-1 rounded-md outline-none cursor-pointer"
            value={status}
            onChange={(e) => setStatus!(e.target.value)}
          >
            <option value={""}>Status</option>
            <option value={"To do"}>To do</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"Completed"}>Completed</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTasks?.length > 0 ? (
          [...filteredTasks]
            .reverse()
            .map((task: any) => (
              <TaskCard
                key={task._id}
                task={task}
                setTasks={setTasks}
                onTaskDelete={onTaskDelete}
              />
            ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No tasks available
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
