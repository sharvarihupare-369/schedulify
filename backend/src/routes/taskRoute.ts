import express from "express";
import authentication from "../middleware/authentication";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/TaskController";

const router = express.Router()

router.post("/create",authentication,createTask);
router.get("/",authentication,getTasks);
router.put("/:id",authentication,updateTask);
router.delete("/:id",authentication,deleteTask);


export default router;