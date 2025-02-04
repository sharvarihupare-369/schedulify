import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/UserController";
import authentication from "../middleware/authentication";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authentication, logoutUser);

export default router;
