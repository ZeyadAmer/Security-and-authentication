const express = require("express");

const bodyParser = require("body-parser");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const app = express(); //this means we call the listen of deploying on app this is our server line
const port = 3000; // this is the port number we run on we made a variable to avoid mistaking the number if used more than once

mongoose.connect(process.env.uri);

const DB = mongoose.connection.useDb("Secrets");
const userSchema = {
  email: String,
  password: String,
};
const user = DB.model("Users", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("home.ejs");
});

app.get("/login", async (req, res) => {
  res.render("login.ejs");
});

app.get("/register", async (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const newUser = await user.create({
    email: req.body.username,
    password: req.body.password,
  });
  res.render("secrets.ejs");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const Loguser = await user.findOne({ email: username });
  if (Loguser.password === password) {
    res.render("secrets.ejs");
  } else {
    console.log("wrong password");
  }
});

app.listen(port, () => {
  console.log("Server running on port 3000");
});
