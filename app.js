import express from 'express';
import cookieParser from 'cookie-parser';
import connectToMongo from './db.js';

import { userRouter } from './routes/userRoute.js';
import bookRoute from './routes/bookRoute.js';
import { dashboardRouter } from './routes/dashboardRoute.js';

import { getGeneralInfo } from './middlewares/authMiddleware.js';

let app = express();
const port = 3000;

//db connection
connectToMongo();

//view engine
app.set('view engine', 'ejs');

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('*', getGeneralInfo);
app.use('/', dashboardRouter);
app.use('/user', userRouter);
app.use('/book', bookRoute);

//running
app.listen(port, () => {
  console.log(`App is running on  ${port}`);
});
