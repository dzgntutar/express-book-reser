import express from "express";
import connectToMongo from "./db.js";

import { userRouter } from "./routes/userRoute.js";
import bookRoute from "./routes/bookRoute.js";
import { dashboardRouter } from "./routes/dashboardRoute.js";

const app = express();
const port = 3000;

//db connection
connectToMongo();

//view engine
app.set("view engine", "ejs");

//routes
app.use("/dashboard", dashboardRouter);
app.use("/user", userRouter);
app.use("/book", bookRoute);

//running
app.listen(port, () => {
  console.log(`App is running on  ${port}`);
});
