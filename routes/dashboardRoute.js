import express from "express";

const dashboardRouter = express.Router();

dashboardRouter.route("/").get((req, res) => {
  res.render("index");
});

export { dashboardRouter };
