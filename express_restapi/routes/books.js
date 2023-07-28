const express = require("express");
const { v1: uuid } = require("uuid");
const router = express.Router();

let booksList = [
  {
    id: 1,
    author: "John Doe",
    title: "JavaScript Book",
  },
  {
    id: 2,
    author: "John Doe",
    title: "Java Book",
  },
];

router.get("/", (req, res, next) => {
  res.json(booksList);
});

router.get("/:id", (req, res, next) => {
  const bookId = parseInt(req.params.id, 10);

  const book = booksList.find((book) => book.id === bookId);

  if (!book)
    res.status(404).json({ status: `Book with id ${bookId} not found` });

  return res.json(book);
});

router.post("/", (req, res) => {
  console.log(req.body);

  const book = {
    id: uuid(),
    title: req.body.title || "Default title",
    author: req.body.author || "Default author",
  };

  booksList.push(book);
  return res.json(book);
});

router.put("/:id", (req, res, next) => {
  const bookId = parseInt(req.params.id, 10);

  booksList.forEach((book) => {
    if (book.id === bookId) {
      (book.title = req.body.title), (book.author = req.body.author);
    } else {
      return;
    }
  });

  const newBook = booksList.find((book) => book.id === bookId);

  return res.json(newBook);
});

router.delete("/:id", (req, res, next) => {
  const bookId = parseInt(req.params.id, 10);

  booksList = booksList.filter((book) => book.id !== bookId);

  const existBook = booksList.find((book) => book.id === bookId);

  if (!existBook) {
    return res
      .status(200)
      .json({ status: `Book with id ${bookId} was deleted` });
  } else {
    return res.status(400).send("Something wrong");
  }
});

module.exports = router;
