import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

const app = express();
const port = 3000;
const secretKey = "secret key";

const users = [
  { id: 1, username: "fabio", password: "123" },
  { id: 2, username: "brian", password: "456" },
];

mongoose.connect("mongodb://localhost:27017/ninernet");

const { Schema, model } = mongoose;

const newsSchema = new Schema(
  {
    title: String,
    body: String,
  },
  {
    collection: "news",
  },
);

const News = model("News", newsSchema);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

const jwtMW = expressjwt({
  secret: secretKey,
  algorithms: ["HS256"],
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
  return;
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    inflate: true,
    limit: "1mb",
    parameterLimit: 5000,
    type: "application/x-www-form-urlencoded",
  }),
);

app.listen(port, () => {
  console.log(`Example port listening on http://localhost:${port}`);
});

app.post("/api/login", cors(), (req, res) => {
  const { username, password } = req.body;
  for (let user of users) {
    if (username == user.username && password == user.password) {
      let token = jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: "180000" },
      );
      res.json({
        success: true,
        err: null,
        token,
      });
      break;
    }
  }
  res.status(401).json({
    success: false,
    token: null,
    err: "incorrect username or password",
  });
});

app.post("/api/validate", (req, res) => {
  if (!req?.body?.token) res.json({ success: false });
  const { token } = req.body || "";
  const decoded = jwt.verify(token, secretKey);
  const expireyDate = new Date(decoded.exp * 1000);
  if (expireyDate > Date.now()) res.json({ success: true });
  res.json({ success: false });
});

app.use(function (err, req, res, next) {
  if (err.name === "Unauthorized") {
    res.status(401).json({
      success: false,
      err,
    });
  } else {
    next(err);
  }
});

app.get("/api/", jwtMW, async (req, res) => {
  const data = await News.find({});
  res.json({
    success: true,
    data: data,
  });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
