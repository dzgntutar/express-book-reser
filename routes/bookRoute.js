import express from "express";

const bookRoute = express.Router();

bookRoute.route("/").get((req, res) => {
  res.send("Book page");
});

export default bookRoute;
