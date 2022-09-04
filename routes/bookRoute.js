import express from 'express';
import Book from '../models/bookModel.js';
import { checkToken } from '../middlewares/authMiddleware.js';

const bookRoute = express.Router();

bookRoute.route('/').get(checkToken, async (req, res) => {
  let books = await Book.find({});
  res.render('bookList', { books });
});

export default bookRoute;
