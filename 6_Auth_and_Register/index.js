const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require("./notes.controller");

const { addUser, loginUser } = require("./user.controller");

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

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Express App",
    error: false,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    res.render("login", {
      title: "Express App",
      error: err.message,
    });
  }
});

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Express App",
    error: false,
  });
});

app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.redirect("login");
  } catch (err) {
    if (err.code === 11000) {
      res.render("register", {
        title: "Express App",
        error: "Email is already registered",
      });
      return;
    }
    res.render("register", {
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

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
    userEmail: req.user.email,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title, req.user.email);
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      created: true,
      userEmail: req.user.email,
      error: false,
    });
  } catch (err) {
    console.log("Creating error: ", err);
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      created: false,
      userEmail: req.user.email,
      error: true,
    });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await removeNote(req.params.id, req.user.email);
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: false,
    });
  } catch (e) {
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: e.message,
    });
  }
});

app.put("/:id", async (req, res) => {
  try {
    await updateNote(
      { id: req.params.id, title: req.body.title },
      req.user.email
    );
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: false,
    });
  } catch (e) {
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: e.message,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://testtestov2110:Qwerty12345@cluster0.3jseyrz.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}`));
    });
  });
