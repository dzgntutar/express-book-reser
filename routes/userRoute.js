import express from "express";
import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils/const.js";
import { checkToken } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", checkToken, async (req, res) => {
  let users = await User.find({});
  res.send(users);
});

userRouter.get("/signin", async (req, res) => {
  res.render("signin");
});

userRouter.post("/signin", async (req, res) => {
  console.log(req.body);
  try {
    User.create(req.body);

    res.redirect("/user/login");
  } catch (error) {
    res.status(404).render("error");
  }
});

userRouter.get("/login", (req, res) => {
  res.status(200).render("login");
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      if (user.password == password) {
        let userId = user._id;
        let token = Jwt.sign({ userId }, JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.redirect("/dashboard");
      } else {
        res.status(401).json({
          succeded: false,
          error: "Paswords are not matched",
        });
      }
    } else {
      res.status(401).json({
        succeded: false,
        error: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succeded: false,
      error,
    });
  }
});

export { userRouter };
