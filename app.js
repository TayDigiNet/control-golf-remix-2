require("dotenv").config();
const express = require("express");
const cors = require("cors");
const scoreController = require("./controllers/score.controller");
const RedisContext = require("./redis");
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS.split(",") }));

const redis = RedisContext.connect();
redis.on("error", (err) => console.log("Redis Client Error", err));
redis.connect();

app.use(express.static("public"));
app.use(express.static("front-end/build/static"));
app.use(express.static("front-end/build"));
// app.use("/control", express.static("public-front-end"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/get-score", scoreController.get);
app.post("/update-score", scoreController.update);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
