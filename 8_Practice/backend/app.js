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

mongoose
  .connect(
    "mongodb+srv://testtestov2110:Qwerty12345@cluster0.3jseyrz.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(
    app.listen(PORT, () => {
      console.log(`Server started, listen to ${PORT} port`);
    })
  );
