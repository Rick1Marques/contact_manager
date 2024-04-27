import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import User from "./models/user.js";

import authRoutes from "./routes/auth.js";
import mainRoutes from "./routes/main.js";

dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

const store = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  collectionName: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "LongStringSecreat",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(async (req, res, next) => {
  try {
    if (!req.session.user) {
      return next();
    }
    const user = await User.findById(req.session.user._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

app.use(authRoutes);
app.use(mainRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
}

startServer();
