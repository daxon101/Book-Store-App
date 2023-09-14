import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./ignored/config.js";
import booksRoute from "./routes/booksRoutes.js";

const app = express();

// MIDDLEWARE
// Parsing request body
app.use(express.json());

// Middleware for CORS policy
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// route to get a message
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", booksRoute);

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
