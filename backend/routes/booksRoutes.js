import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to get all books from database
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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

// Route to delete a specific book by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

export default router;
