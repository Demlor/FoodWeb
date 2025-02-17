import express from "express";
import { registerUser, loginUser, changePassword, UserList , Userremove } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/Register", registerUser);
userRouter.post("/Login", loginUser);
userRouter.post("/changePassword", changePassword); 
userRouter.post("/Userremove", Userremove);
userRouter.get("/userList", UserList);

export default userRouter;