import express from "express";
import MemoryModel from "../models/Memory.js";

const router = express.Router();

// Get Memoreis
router.get("/memoreis", async (req, res) => {
  try {
    const memories = await MemoryModel.find({});

    res.status(200).send(memories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Post Memoreis
router.post("/memoreis", async (req, res) => {
  const newPost = new MemoryModel({
    creator: req.body.creator,
    title: req.body.title,
    message: req.body.message,
    likes: req.body.likes,
  });

  try {
    await newPost.save();
    res.send(newPost);
  } catch (error) {
    res.status(404).json({ Error: error });
  }
});

// Edit Memoreis
router.put("/memoreis/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await MemoryModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          creator: req.body.creator,
          title: req.body.title,
          message: req.body.message,
          likes: req.body.likes,
        },
      }
    );

    const memory = await MemoryModel.findById(id);
    res.status(201).json(memory);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Delete Memoreis
router.delete("/memoreis/:id", async (req, res) => {
  try {
    const result = await MemoryModel.deleteOne({ _id: req.params.id });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
