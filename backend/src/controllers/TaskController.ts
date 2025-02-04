import { Request, Response } from "express";
import { APIResponse, TaskCreateRequest } from "../utils/types";
import TaskModel from "../models/TaskModel";
import { validateTaskCreation } from "../middleware/validation";

export const createTask = async (
  req: TaskCreateRequest,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const { error } = validateTaskCreation.validate(req.body);
    if (error) {
      const errMsg = error.details.map((er) => er.message).join(", ");
      res.status(400).send({ success: false, message: errMsg });
      return;
    }
    const { title, due_date } = req.body;
    const existingTask = await TaskModel.findOne({
      title,
      due_date,
      userId: req.userId,
    });
    if (existingTask) {
      res
        .status(400)
        .send({
          success: false,
          message: "Task with this title and due date already exists",
        });
    }

    const userId = req.userId;
    const task = await TaskModel.create({ ...req.body, userId: userId });
    res.status(201).send({
      success: true,
      message: "Task Created Successfully",
      data: task,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getTasks = async (
  req: Request,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const userId = req.userId;
    const { priority } = req.query;
    const filters: { userId: string; priority?: string, status?: string } = { userId };
    if (priority) filters.priority = priority as string;
    if (status) filters.status = status as string;

    const alltasks = await TaskModel.find(filters);
    if (alltasks.length === 0) {
      res.status(400).send({ success: false, message: "Task creation failed" });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Fetched all tasks successfully",
      data: alltasks,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const task = await TaskModel.findByIdAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );
    if (!task) {
      res
        .status(400)
        .send({ success: false, message: "No task found.", data: task });
    }
    res.status(200).send({
      success: true,
      message: "Task Updated Successfully",
      data: task,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete({ _id: id, userId });
    if (!task) {
      res.status(400).send({ success: false, message: "No task found." });
    }
    res.status(200).send({
      success: true,
      message: "Task Deleted Successfully",
      data: task,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
