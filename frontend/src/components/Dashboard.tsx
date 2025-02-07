import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { fetchAllTasks } from "../api/task";
import { DashboardTask } from "../utils/types";
import Loader from "./Loader";

const Dashboard: React.FC<DashboardTask> = ({
  tasks,
  setTasks,
  onTaskDelete,
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

  return (
   isLoading ? <Loader/> :   <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks?.length > 0 ? (
          tasks.map((task: any, index: number) => (
            <TaskCard
              key={index}
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
