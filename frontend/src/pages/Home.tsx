import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import { TaskP } from "../utils/types";

const Home = () => {
  const [tasks, setTasks] = useState<TaskP[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskP[]>(tasks);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(()=>{
    setFilteredTasks(tasks)
  },[tasks])
  const handleTaskCreated = (newTask: TaskP) => {
    setTasks((prevTasks: TaskP[]) => [...prevTasks,newTask]);
    setFilteredTasks((pre: TaskP[]) => [...pre,newTask]);
    setShowTaskForm(false);
    setPriority("");
    setStatus("")
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
        setPriority={setPriority}
        priority={priority}
        setStatus={setStatus}
        status={status}
      />
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
      <Dashboard
        // tasks={tasks}
        setPriority={setPriority}
        priority={priority}
        tasks={filteredTasks}
        setTasks={setTasks}
        onTaskDelete={handleTaskDelete}
        setStatus={setStatus}
        status={status}
      />
    </div>
  );
};

export default Home;
