import express from "express";
import Athlete from "../models/Athlete.js";

const router = express.Router();

// Get all athletes
router.get("/", async (req, res, next) => {
  try {
    const athletes = await Athlete.find()
      .populate("team")
      .sort({ createdAt: -1 });
    res.json(athletes);
  } catch (err) {
    next(err);
  }
});

// Get single athlete
router.get("/:id", async (req, res, next) => {
  try {
    const athlete = await Athlete.findById(req.params.id).populate("team");
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json(athlete);
  } catch (err) {
    next(err);
  }
});

// Create athlete
router.post("/", async (req, res, next) => {
  try {
    const athlete = new Athlete(req.body);
    await athlete.save();
    const populated = await Athlete.findById(athlete._id).populate("team");
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// Update athlete
router.put("/:id", async (req, res, next) => {
  try {
    const athlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("team");
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json(athlete);
  } catch (err) {
    next(err);
  }
});

// Delete athlete
router.delete("/:id", async (req, res, next) => {
  try {
    const athlete = await Athlete.findByIdAndDelete(req.params.id);
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json({ message: "Athlete deleted successfully!" });
  } catch (err) {
    next(err);
  }
});

export default router;
