import express from "express";
import { Team } from "../models/Team.js";
import Athlete from "../models/Athlete.js";

const router = express.Router();

// Get all teams
router.get("/", async (req, res, next) => {
  try {
    const teams = await Team.find()
      .populate("coach", "firstName lastName email role")
      .populate("assistantCoaches", "firstName lastName email role")
      .sort({ createdAt: -1 })
      .lean();
    res.json(teams);
  } catch (err) {
    console.error("Error in GET /teams", err);
    next(err);
  }
});

// Get a single team with its athletes
router.get("/:id", async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("coach", "firstName lastName email role")
      .populate("assistantCoaches", "firstName lastName email role")
      .lean();
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    // Get all athletes for this team
    const athletes = await Athlete.find({ team: req.params.id })
      .select("firstName lastName email position jerseyNumber status")
      .lean();

    // Retrun combined data
    res.json({
      _id: team._id,
      name: team.name,
      sport: team.sport,
      category: team.category,
      ageGroup: team.ageGroup,
      coach: team.coach,
      assistantCoaches: team.assistantCoaches,
      maxCapacity: team.maxCapacity,
      description: team.description,
      status: team.status,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
      athletes: athletes,
    });
  } catch (err) {
    console.error("Error in GET /teams/:id:", err);
    next(err);
  }
});

// Create a team
router.post("/", async (req, res, next) => {
  try {
    const team = new Team(req.body);
    const savedTeam = await team.save();

    const populated = await Team.findById(savedTeam._id)
      .populate("coach", "firstName lastName email role")
      .populate("assistantCoaches", "firstName lastName email role")
      .lean();
    res.status(201).json(populated);
  } catch (err) {
    console.error("Error in POST /teams:", err);
    next(err);
  }
});

// Update a team
router.put("/:id", async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      lean: true,
    })
      .populate("coach", "firstName lastName email role")
      .populate("assistantCoaches", "firstName lastName email role");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);
  } catch (err) {
    console.error("Error in PUT /teams/:id:", err);
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
    res.json({ message: "Team deleted successfully", id: req.params.id });
  } catch (err) {
    console.error("Error in DELETE /teams/:id", err);
    next(err);
  }
});

export default router;
