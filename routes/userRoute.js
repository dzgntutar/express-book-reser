import express from "express";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  let users = await User.find({});
  res.send(users);
});

userRouter.post("/", async (req, res) => {
  try {
    User.create(req.body);
  } catch (error) {
    console.log(req.body);
  }
});

userRouter.get("/login", (req, res) => {
  res.status(200).render("login");
});

export { userRouter };
