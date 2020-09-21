import express from "express";
import { loginUser } from "../controller/users/login";
import { registerUser } from "../controller/users/signup";

export const userRouter = express.Router();

userRouter.put("/signup", registerUser);
userRouter.post("/login", loginUser);