import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/routes.js";
import dotenv from "dotenv";
const app = express();
import path from "path";

import { fileURLToPath } from "url";
const PORT = process.env.PORT || 8080;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(postRoutes);

// concted to dbs
mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" DB is conccted"))
  .catch((err) => console.log(err));

// Deploing
if (process.env.MEMORIES_URI === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}
// Port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
