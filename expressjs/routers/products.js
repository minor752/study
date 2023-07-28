const express = require("express");
const router = express.Router();

const products = ["Apple", "Samsung"];

router.get("/", async (req, res, next) => {
  req.query.page
    ? console.log("page", req.query.page)
    : console.log("page not specified");

  res.json({ products });
  next();
});

router.get("/:id", async (req, res, next) => {
  if (products[req.params.id]) {
    res.send(products[req.params.id]);
  } else {
    res.status(404).send("Product not found");
  }
});

module.exports = router;
