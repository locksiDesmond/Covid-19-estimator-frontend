const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT;
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  //   console.log("got here");
  //   res.send("overhere");
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.listen(PORT, () => {
  console.log(`you are currently listening on port${PORT}`);
});
