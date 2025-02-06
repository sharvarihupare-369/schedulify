export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
}

export interface TaskProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    status: "To do" | "In Progress" | "Completed";
    priority: "High" | "Medium" | "Low";
    due_date: Date;
  };
}

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}


export interface TaskCardProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onTaskDelete: (id: string) => void; 
}

export interface TaskFormProps {
  onClose: () => void;
  onTaskCreated: (task: any) => void;
}

export interface TaskP {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface DashboardTask {
  tasks: TaskP[];
  setTasks: React.Dispatch<React.SetStateAction<TaskP[]>>;
  onTaskDelete: (id: string) => void; 
}
