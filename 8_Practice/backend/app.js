require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const PORT = 3001;
const app = express();
app.use(express.static("../frontend/dist"));

app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);

mongoose.connect(process.env.DB_CONNECTION.STRING).then(
  app.listen(PORT, () => {
    console.log(`Server started, listen to ${PORT} port`);
  })
);
