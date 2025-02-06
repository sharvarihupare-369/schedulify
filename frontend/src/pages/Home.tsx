import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import {  TaskP } from '../utils/types';

const Home = () => {
  const [tasks, setTasks] = useState<TaskP[]>([]);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const handleTaskCreated = (newTask:TaskP) => {
    setTasks((prevTasks:any) => [newTask, ...prevTasks]);
    setShowTaskForm(false);
  };

  const handleTaskDelete = (taskId:string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };


  return (
    <div >
      <Navbar onCreateTaskClick={() => setShowTaskForm(true)}/>
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
      <Dashboard tasks={tasks} setTasks={setTasks} onTaskDelete={handleTaskDelete} />
    </div>
  )
}

export default Home