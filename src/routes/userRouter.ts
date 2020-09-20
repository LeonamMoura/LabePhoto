import express from "express";
import { registerUser } from "../controller/users/signup";

export const userRouter = express.Router();

userRouter.put("/signup", registerUser)