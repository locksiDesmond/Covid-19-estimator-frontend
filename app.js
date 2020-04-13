const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const compression = require("compression");
const PORT = process.env.PORT;
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  //   console.log("got here");
  //   res.send("overhere");
  res.status = 200;
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.use(function (req, res) {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});
app.use((err, req, res, next) => {
  if (err) {
    res.send(err.stack);
  }
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});
app.listen(PORT);
