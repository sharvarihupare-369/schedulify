import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import BlackListModel from "../models/BlackListModel";

dotenv.config();

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(400).send({ message: "Access denied. No token provided!" });
      return;
    }
    const isTokenBlackListed = await BlackListModel.findOne({ token });
    if (isTokenBlackListed) {
      res.status(400).send({ message: "Token is already blacklisted." });
      return;
    }
    const secretKey = process.env.secretKey || "";
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    if (!decoded.userId) {
      res.status(400).send({ message: "Invalid token, user ID is missing." });
      return;
    }

    req.userId = decoded.userId as string;

    next();
  } catch (error: any) {
    res.status(500).send({ error: error.messages || "Something went wrong." });
  }
};

export default authentication;
