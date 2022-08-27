import express from "express";
import { userRouter } from "./routes/userRoute.js";
import bookRoute from "./routes/bookRoute.js";

const app = express();
const port = 3000;

app.use("/user", userRouter);
app.use("/book", bookRoute);

app.listen(port, () => {
  console.log(`App is running on  ${port}`);
});
