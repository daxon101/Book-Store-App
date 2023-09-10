import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

// MIDDLEWARE
// Parsing request body
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});

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
