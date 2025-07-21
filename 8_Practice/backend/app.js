require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const PORT = 3001;
const app = express();
app.use(express.static(path.resolve("..", "frontend", "dist")));

app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

mongoose.connect(process.env.DB_CONNECTION.STRING).then(
  app.listen(PORT, () => {
    console.log(`Server started, listen to ${PORT} port`);
  })
);
