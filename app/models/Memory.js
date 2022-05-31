import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  creator: String,
  title: String,
  message: String,
  likes: Number,
});

const MemoryModel = mongoose.model("Memory", postSchema);

export default MemoryModel;
