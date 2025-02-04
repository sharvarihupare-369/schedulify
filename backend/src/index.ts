import express from "express";
require("dotenv").config();
import type { Request, Response } from "express";
import cors from "cors";
import connection from "./config/db";
import userRouter from "./routes/userRoute";
import taskRouter from "./routes/taskRoute"

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Base Rouet!");
});

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Something went wrong with the database connection");
  }
  console.log(`Server is running on port ${PORT}`);
});
