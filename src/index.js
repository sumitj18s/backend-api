const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/user");
const cors = require("cors");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose.connect(process.env.DB_HOST || "mongodb://localhost:27017/LAB", { useNewUrlParser: true });
const db = mongoose.connection;

if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

app.get("/users", async (req, res) => {
  const result = await User.find().exec();
  console.log(result);
  res.send(result);
});

app.post("/user", async (req, res) => {
  const user = new User(req.body);
  await user.save().catch((err) => {
    console.error(err);
  });
  res.send("User is created.");
});

const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log("Running Node server on port " + port);
});
