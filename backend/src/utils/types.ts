import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export interface RegisterUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface LoginUserRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

type StatusType = "To do" | "In Progress" | "Completed"
type PriorityType = "High" | "Medium" | "Low"

export interface TaskCreateRequest extends Request {
  userId: string;
  body: {
    title:string;
    description ?: string;
    status: StatusType;
    priority: PriorityType;
    due_date: Date 
  },
}