import express from 'express';
import cookieParser from 'cookie-parser';
import connectToMongo from './db.js';

import { authRouter } from './routes/authRoute.js';
import { userRouter } from './routes/userRoute.js';
import bookRoute from './routes/bookRoute.js';
import { dashboardRouter } from './routes/dashboardRoute.js';

import { getGeneralInfo } from './middlewares/authMiddleware.js';

let app = express();
const port = 3000;

// Static Files
app.use(express.static('public'));

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
app.use('/index', dashboardRouter);
app.use('/users', userRouter);
app.use('/books', bookRoute);
app.use('/', authRouter);

//running
app.listen(port, () => {
    console.log(`App is running on  ${port}`);
});
