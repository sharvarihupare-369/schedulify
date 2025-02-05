import TaskCard from "./TaskCard";

const Dashboard = () => {
  const tasks = [
    {
      title: "Complete UI Design",
      description: "Design the dashboard UI using Tailwind & React.",
      status: "In Progress",
      priority: "High",
      due_date: new Date(),
    },
    {
      title: "Fix API Bugs",
      description: "Resolve backend validation issues in Task Model.",
      status: "To do",
      priority: "Medium",
      due_date: new Date(),
    },
    {
      title: "Deploy to Production",
      description: "Deploy the app to Vercel & MongoDB Atlas.",
      status: "Completed",
      priority: "Low",
      due_date: new Date(),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task: any, index: number) => (
            <TaskCard key={index} task={task} />
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
