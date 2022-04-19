require("dotenv").config();
const express = require("express");
const mainRouter = require("./Routes");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ hello: "World" });
});

app.use("/api", mainRouter);

module.exports = app;
