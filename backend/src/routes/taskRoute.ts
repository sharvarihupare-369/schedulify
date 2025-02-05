import express from "express";
import authentication from "../middleware/authentication";
import { createTask, deleteTask, getTasks, softDeleteTask, updateTask } from "../controllers/TaskController";

const router = express.Router()

router.post("/create",authentication,createTask);
router.get("/",authentication,getTasks);
router.put("/:id",authentication,updateTask);
router.delete("/:id",authentication,softDeleteTask);
router.delete("/delete/:id",authentication,deleteTask);


export default router;