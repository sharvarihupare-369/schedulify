
export interface RegisterUserPayload {
    name:string,
    email:string,
    password:string
}

export interface LoginUserPayload {
    email:string,
    password:string
}


export interface AuthContextType {
  token: string | null;
  setToken: (token: string  | null) => void;
  username: string  | null;
  setUsername: (username: string | null) => void;
}

export interface TaskProps {
  task: {
    title: string;
    description?: string;
    status: "To do" | "In Progress" | "Completed";
    priority: "High" | "Medium" | "Low";
    due_date: Date;
  };
}
