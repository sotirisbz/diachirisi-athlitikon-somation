import express from "express";
import { Team } from "../models/Team.js";
import Athlete from "../models/Athlete.js";

const router = express.Router();

// Get all teams
router.get("/", async (req, res, next) => {
  try {
    const teams = Team.find()
      .populate("coach assistantCoaches")
      .sort({ createdAt: -1 });
    res.json(teams);
  } catch (err) {
    next(err);
  }
});

// Get a single team with its athletes
router.get("/:id", async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id).populate(
      "coach assistantCoaches"
    );
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    // Get all athletes for this team
    const athletes = await Athlete.find({ team: req.params.id });
    res.json({ ...team.toObject(), athletes });
  } catch (err) {
    next(err);
  }
});

// Create a team
router.post("/", async (req, res, next) => {
  try {
    const team = new Team(req.body);
    await team.save();
    const populated = await Team.findById(team._id).populate(
      "coach assistanceCoaches"
    );
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// Update a team
router.put("/:id", async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("coach assistantCoaches");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);
  } catch (err) {
    next(err);
  }
});

// Delete team
router.delete("/:id", async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
