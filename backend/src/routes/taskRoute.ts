import express from "express";
import authentication from "../middleware/authentication";
import { createTask } from "../controllers/TaskController";

const router = express.Router()

router.post("/create",authentication,createTask);


export default router;