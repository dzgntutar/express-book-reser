import express from "express";
import Book from "../models/bookModel.js";

const bookRoute = express.Router();

bookRoute.route("/").get(async (req, res) => {
  let books = await Book.find({});
  res.send(books);
});

export default bookRoute;
