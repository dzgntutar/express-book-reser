import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils/const.js";

const checkToken = (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, JWT_SECRET_KEY, async (error) => {
        if (error) {
          res.redirect("/user/login");
        }
        next();
      });
    } else res.redirect("/user/login");
  } catch (error) {
    console.log(error);
    res.status(401).json({
      succeeded: false,
      error: "Not authorized",
    });
  }
};

export { checkToken };
