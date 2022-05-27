import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes.js";
import dotenv from "dotenv";
import { join } from "path";
const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(postRoutes);

// concted to db
mongoose
  .connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" DB is conccted"))
  .catch((err) => console.log(err));

app.use(express.static(join(__dirname, "..", "client", "build")));
app.get("*", (_req, res) => {
  res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
