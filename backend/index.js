import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { PORT, mongoDBURL } from "./ignored/config.js";

const app = express();

// MIDDLEWARE
// Parsing request body
app.use(express.json());

// ROUTES
// route to get a message
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});

// Route to get all books from database
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({}); //{} empty object results in all books
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// Route to get a single book from the database
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// Route to create a book in the database
app.post("/books", async (req, res) => {
  // Validation for required fields
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    //   create an object with the new book data
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    //   submit the new book data to the mongo model
    const book = await Book.create(newBook);

    //   Send a success status and the book back to the client
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to replace the entire book - all data to be sent via the header
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// LAUNCHING THE SERVER
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`listening on https://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
