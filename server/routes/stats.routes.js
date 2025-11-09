import express from "express";
import Athlete from "../models/Athlete.js";
import { Team } from "../models/Team.js";
import { Staff } from "../models/Staff.js";

const router = express.Router();

// Get dashboard statistics
router.get("/", async (req, res, next) => {
  try {
    const [
      totalAthletes,
      totalTeams,
      totalStaff,
      athletesByStatus,
      teamsByCategory,
    ] = await Promise.all([
      Athlete.countDocuments(),
      Team.countDocuments(),
      Staff.countDocuments(),
      Athlete.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Team.aggregate([{ $group: { _id: "category", count: { $sum: 1 } } }]),
    ]);
    res.json({
      totalAthletes,
      totalTeams,
      totalStaff,
      athletesByStatus,
      teamsByCategory,
    });
  } catch (err) {
    console.error("Stats route error:", err);
    next(err);
  }
});

export default router;
