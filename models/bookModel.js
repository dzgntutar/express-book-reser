import mongoose from "mongoose";

const { Schema } = mongoose;

// public string Name { get; set; }
//         public string PublishDate { get; set; }
//         public int Type { get; set; }
//         public string Author { get; set; }
//         public string Publisher { get; set; }
//         public short Count { get; set; }

const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Usern  name is required"],
      lowercase: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    Publisher: {
      type: String,
      required: [true, "Publisher area is required"],
      unique: true,
    },
    PublishYear: {
      type: String,
      required: [true, "PublishYear area is required"],
      unique: true,
    },
    Count: {
      type: Number,
      required: [true, "Password area is required"],
      minLength: [4, "At least 4 characters"],
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;
