import express from "express";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.route("/").get(async (req, res) => {
  let users = await User.find({});
  res.send(users);
});

export { userRouter };
