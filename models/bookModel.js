import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Usern  name is required'],
      lowercase: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    Publisher: {
      type: String,
      required: [true, 'Publisher area is required'],
      unique: true,
    },
    PublishYear: {
      type: String,
      required: [true, 'PublishYear area is required'],
      unique: true,
    },
    Count: {
      type: Number,
      required: [true, 'Password area is required'],
      minLength: [4, 'At least 4 characters'],
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', BookSchema);

export default Book;
