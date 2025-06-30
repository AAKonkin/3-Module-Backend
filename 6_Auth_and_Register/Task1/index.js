const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

const {
  addApplication,
  getApplications,
} = require("./applications.controller");

const { loginEmployee } = require("./employees.controller");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(auth);

app.get("/", async (req, res) => {
  if (req.user) {
    res.render("index", {
      title: "Заявки с формы",
      applications: await getApplications(),
      isEmployee: true,
      created: false,
      error: false,
    });
  } else {
    res.render("index", {
      title: "Запись к врачу",
      isEmployee: false,
      created: false,
      error: false,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    await addApplication(req.body.fio, req.body.phone, req.body.problem);
    res.render("index", {
      title: "Запись к врачу",
      isEmployee: false,
      created: true,
      error: false,
    });
  } catch (err) {
    console.log("Creating error: ", err);
    res.render("index", {
      title: "Запись к врачу",
      isEmployee: false,
      created: false,
      error: true,
    });
  }
});

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Вход",
    error: false,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginEmployee(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("login", {
      title: "Express App",
      error: err.message,
    });
  }
});

app.get("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.redirect("/login");
});

app.use(auth);

mongoose
  .connect(
    "mongodb+srv://testtestov2110:Qwerty12345@cluster0.3jseyrz.mongodb.net/clinik?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}`));
    });
  });
