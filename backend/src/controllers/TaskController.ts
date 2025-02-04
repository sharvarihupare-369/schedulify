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
    const {title,due_date} = req.body;
    const existingTask = await TaskModel.findOne({title,due_date,userId:req.userId});
    if(existingTask){
      res.status(400).send({success:false,message:"Task with this title and due date already exists"})
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
