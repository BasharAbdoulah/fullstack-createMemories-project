import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes.js";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(postRoutes);

// concted to db
mongoose
  .connect("mongodb://localhost:27017/memoriesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" DB is conccted"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
