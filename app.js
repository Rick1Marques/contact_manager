import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(authRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
}

startServer();
