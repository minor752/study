const express = require("express");
const dotenv = require("dotenv");
const timeStamp = require("time-stamp");

const booksRouter = require("./routers/books");
const productsRouter = require("./routers/products");

dotenv.config();

const host = process.env.HOST ? process.env.HOST : "http://localhost";
const port = process.env.PORT;
const app = express();

app.use(async (req, res, next) => {
  const actionsToServer = {
    URL: req.originalUrl,
    ip: req.ip,
    method: req.method,
    date: timeStamp("[HH:mm:ss -> DD-MM-YYYY]"),
  };

  console.table(actionsToServer);

  next();
});

app.use("/static", express.static(__dirname + "/public"));

app.get("/", async (req, res, next) => {
  res.send("Home");
});

app.use("/books", booksRouter);
app.use("/products", productsRouter);

app.get("/download", async (req, res, next) => {
  const file = `${__dirname}/public/text.txt`;
  res.download(file, "another_name.txt", (err) => {
    console.log("file sended");
  });
});

app.get("/blog", async (req, res, next) => {
  res.redirect("/");
});

app.use(async (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err.stack);
});

app.listen(port, async () => {
  console.log(
    `[server]: Server is running at ${host}:${port}`,
    timeStamp("[HH:mm:ss -> DD/MM/YYYY]")
  );
});
