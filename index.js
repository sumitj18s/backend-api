const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./user");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// Connect to Mongoose and set connection constiable
mongoose.connect("mongodb://localhost:27017/LAB", { useNewUrlParser: true });
const db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

const port = process.env.PORT || 8080;

// Send message for default URL
app.get("/users", async (req, res) => {
  const result = await User.find().exec();
  console.log(result);
  res.send(result);
});

app.post("/user", async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  await user
    .save()
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
  res.send("User is created.");
});
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Node server on port " + port);
});
