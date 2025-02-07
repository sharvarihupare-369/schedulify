import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import TaskForm from "../components/TaskForm";
import { TaskP } from "../utils/types";

const Home = () => {
  const [tasks, setTasks] = useState<TaskP[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskP[]>(tasks);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  const handleTaskCreated = (newTask: TaskP) => {
    setTasks((prevTasks: any) => [newTask, ...prevTasks]);
    setFilteredTasks((pre: any) => [newTask, ...pre]);
    setShowTaskForm(false);
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const handleSearch = (input: string) => {
    const filteredData = [...tasks].filter((task: TaskP) =>
      task.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredTasks(filteredData);
  };

  return (
    <div>
      <Navbar
        tasks={tasks}
        setTasks={setTasks}
        onCreateTaskClick={() => setShowTaskForm(true)}
        handleSearch={handleSearch}
      />
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
      <Dashboard
        // tasks={tasks}
        tasks={filteredTasks}
        setTasks={setTasks}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
};

export default Home;
